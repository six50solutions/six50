
import { google } from '@ai-sdk/google';
import { tool, streamText } from 'ai';
import { z } from 'zod';
import { sendLeadNotification } from '@/lib/email-service';

export const maxDuration = 30;

const leadSchema = z.object({
  name: z.string().describe('The name of the visitor'),
  email: z.string().describe('The email address of the visitor'),
  phone: z.string().optional().describe('Phone number if provided'),
  company: z.string().optional().describe('Company name if provided'),
  goal: z.string().optional().describe('The goal or need described by the visitor'),
  timeline: z.string().optional().describe('Timeline if provided'),
});

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
5. **SAVE THE LEAD**: Once you have the core details (Name, Email, and some context on Goal/Company), you MUST call the "saveLead" tool. Do this BEFORE routing them to contact or scheduling.
6. Route them to Contact or offer scheduling once you have enough context.

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
      model: google('gemini-2.0-flash'),
      // Manually map to CoreMessage to avoid version dependency issues with helper functions
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content
      })),
      system: systemPrompt,
      tools: {
        saveLead: tool({
          description: 'Save lead details like name, email, company, goal, etc. Call this when you have gathered sufficient information.',
          parameters: leadSchema,
          execute: async (args: z.infer<typeof leadSchema>) => {
            console.log('Tool execute: saveLead', args);
            // Call our shared email service
            const result = await sendLeadNotification({
              name: args.name,
              email: args.email,
              phone: args.phone,
              company: args.company,
              goal: args.goal ? `${args.goal} (Timeline: ${args.timeline})` : args.timeline,
              source: 'chat'
            });
            return { success: true, notified: true };
          },
        } as any),
      },
      // @ts-ignore
      maxSteps: 5, // Allow tool steps
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }), { status: 500 });
  }
}
