
import { google } from '@ai-sdk/google';
import { tool, streamText } from 'ai';
import { sendLeadNotification } from '@/lib/email-service';

export const maxDuration = 30;

export async function POST(req: Request) {
  console.log('Chat API: POST request received');
  try {
    const { messages } = await req.json();
    console.log('Chat API: Processing messages', messages.length);

    const systemPrompt = `You are Dylan, the Six50 FrontDesk AI for six50 (strategy & consulting).
Voice: concise, sharp, credible, and helpful. No hype.
Positioning: "clarity triggers transformation," "no AI theater," "trusted execution," and "measurable operational reality."

**CRITICAL FORMATTING RULES:**
- DO NOT use bolding (**text**), italics (*text*), or any markdown formatting in your responses. Write in plain text only.
- The chat widget does not support markdown rendering, so raw asterisks look broken.

Primary goals:
1. **Introduce yourself** immediately as Dylan and ask for the visitor's name.
2. Understand the visitor's goal in 1–2 questions.
3. **Capture Lead Details**: You must naturally gather the following:
   - Name
   - Email
   - Phone
   - Company
   - specific Need/Goal
   - Timeline
4. **Missing Information**: If a detail (like timeline) is not provided, ASK for it. Do NOT state "unspecified" or "unknown".
5. **SAVE AND CLOSING**: Once you have the core details, you MUST call the "saveLead" tool AND simultaneously allow the user to know you have what you need.
   - **CRITICAL**: Before/While calling the tool, generate the final confirmation text: "Thank you, [Name]. I have captured your details and different member of our team will reach out shortly to discuss [Goal]."
   - Do NOT say "Saving information". Say the final confirmation immediately.
6. Auto-close will handle the rest.
7. **RESUMING**: If the user sends a message after you have already saved their lead (i.e., this is a new session), greet them by Name ("Hi [Name]") and ask if you can help with anything else. Do not ask for their details again.
8. Route them to Contact or offer scheduling once you have enough context.

Guardrails:
- Don't invent capabilities or client names.
- Don't promise outcomes.
- If asked for exact pricing: give ranges and offer a short scoping call.
- Keep answers short; ask one question at a time.

Qualification questions (pick only what's needed):
- What outcome are you trying to achieve?
- What's the current process/tools?
- When are you looking to see results? (Timeline)
- Who's the decision maker?

Lead capture trigger:
- If user asks about getting started, pricing, timeline, proposal, or booking, ask for name/email/company and summarize their request.
- CALL THE "saveLead" TOOL with the gathered information.

Services Knowledge Blob:
- Strategy: clarity triggers transformation.
- Consulting: trusted execution, measurable operational reality.
- AI Agents: no AI theater, real automated workflows.
`;


    const result = streamText({
      model: google('gemini-pro-latest'),
      // Manually map to CoreMessage to avoid version dependency issues with helper functions
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content
      })),
      system: systemPrompt,
      onStepFinish: (step) => {
        console.log(`Step finished: ${step.text} (ToolCalls: ${step.toolCalls.length})`);
      },
      onFinish: (result) => {
        console.log(`Stream finished: ${result.text} (Reason: ${result.finishReason})`);
      },
      tools: {
        saveLead: tool({
          description: 'Save lead details like name, email, company, goal, etc. Call this when you have gathered sufficient information.',
          parameters: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'The name of the visitor' },
              email: { type: 'string', description: 'The email address of the visitor' },
              phone: { type: 'string', description: 'Phone number if provided' },
              company: { type: 'string', description: 'Company name if provided' },
              goal: { type: 'string', description: 'The goal or need described by the visitor' },
              timeline: { type: 'string', description: 'Timeline if provided' }
            },
            required: ['name', 'email']
          },
          execute: async (args: any) => {
            console.log('Tool execute: saveLead', args);
            // Call our shared email service
            try {
              const result = await sendLeadNotification({
                name: args.name,
                email: args.email,
                phone: args.phone,
                company: args.company,
                goal: args.goal ? `${args.goal} (Timeline: ${args.timeline})` : args.timeline,
                source: 'chat'
              });
              return { success: true, message: "Lead saved and email sent. Now confirm to user." };
            } catch (err) {
              console.error('Failed to notify lead:', err);
              return { success: true, message: "Lead saved locally (email failed). Proceed with confirmation." };
            }
          },
        } as any),
      },
      // @ts-ignore
      maxSteps: 10,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }), { status: 500 });
  }
}
