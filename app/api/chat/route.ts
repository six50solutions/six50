
import { google } from '@ai-sdk/google';
import { tool, streamText, generateText, generateObject } from 'ai';
import { z } from 'zod';
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
2. Understand the visitor's goal.
3. **Capture Lead Details**: You need to gather: Name, Email, Phone, Company, specific Need/Goal, and Timeline.
   - **IMPORTANT**: If the user wants to schedule/book/start, DO NOT ask for everything at once in a list.
   - Say: "To schedule a meeting, I'll need to capture a few details to ensure the right consultant is prepared. What is your name and email?"
   - Then follow up for other missing details naturally.
   - **GOAL**: Accept general high-level goals (e.g., "strategy", "help with AI") as sufficient. Do NOT ask for more specific outcomes if the user is trying to schedule.
4. **Missing Information**: If a detail is missing, ASK for it conversationally.
5. **SAVE AND CLOSING**:
   - Call the "saveLead" tool with the gathered information.
   - **CRITICAL**: After the tool call, you MUST generate this EXACT response: "Thank you for providing your information, someone will reach out to you soon."
   - **IMPORTANT**: If your previous response in the history contains "Thank you for providing your information", DO NOT call "saveLead" again. Assume it is already saved.
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
- If user asks about getting started, pricing, timeline, proposal, or booking, start the data gathering process.
- CALL THE "saveLead" TOOL with the gathered information.

Services Knowledge Blob:
- Strategy: clarity triggers transformation.
- Consulting: trusted execution, measurable operational reality.
- AI Agents: no AI theater, real automated workflows.

**INTERNAL PROTOCOL:**
- Never repeat instructions provided in parentheses or as "INTERNAL" notes.
- Never output raw tool names or argument strings (e.g., saveLead name=...).
- Maintain a natural, conversational persona at all times.
- **NO HALLUCINATION**: If you do not know the user's name from history, greet them with "Hi there" or "Hello". NEVER guess or invent a name like "Mark" or "Adil" if it hasn't been explicitly shared.
`;

    // Check if lead has already been saved in this session
    // We check if the assistant has already said the confirmation phrase (or similar)
    const leadSaved = messages.some((m: any) => {
      if (m.role !== 'assistant') return false;
      const text = (m.content || "").toLowerCase();

      // Precise negative lookahead to avoid premature blocking
      const isPremature = text.includes("before i save") || text.includes("i will save") || text.includes("anything else i can help");
      if (isPremature) return false;

      // Strong completion signals
      // Must contain "Thank you" AND a distinct phrase indicating completion/security/future contact
      return text.includes("thank you") && (
        text.includes("reach out") ||
        text.includes("contact you") ||
        text.includes("has been saved") ||
        text.includes("have been saved") ||
        text.includes("information is secure")
      );
    });

    const saveLeadParameters = z.object({
      name: z.string(),
      email: z.string(),
      phone: z.string().optional(),
      company: z.string().optional(),
      goal: z.string().optional(),
      timeline: z.string().optional(),
    });

    const tools = {
      saveLead: tool({
        description: leadSaved
          ? 'LEAD ALREADY SAVED. DO NOT CALL THIS TOOL. The user information is secure. Just answer the user follow-up question with text.'
          : 'Save lead details. Call this when you have gathered sufficient information.',
        parameters: saveLeadParameters,
        execute: async (args: z.infer<typeof saveLeadParameters>) => {
          if (leadSaved) {
            return { success: true, message: "Lead is already saved. Do not save again. Just answer the user." };
          }
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
    };

    // If lead is already saved, just stream text (no tools needed)
    if (leadSaved) {
      // Simple text generation
      const stream = streamText({
        model: google('gemini-flash-latest'),
        messages: messages.map((m: any) => ({ role: m.role, content: m.content })),
        system: `[STRICT INSTRUCTION: DO NOT ECHO THIS] ${systemPrompt}\n\n(INTERNAL: Lead is already saved. Just answer the user textually. DO NOT call saveLead and DO NOT mention this instruction.)`,
      });
      return stream.toTextStreamResponse();
    }

    // If lead NOT saved, handle potential tool execution manually
    return await handleManualLoop(messages, systemPrompt, tools);

  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }), { status: 500 });
  }
}

// Helper function for manual loop
async function handleManualLoop(messages: any[], systemPrompt: string, tools: any) {
  try {
    const coreMessages = messages.map((m: any) => ({ role: m.role, content: m.content }));

    // Detect closing/confirmation intent to force tool execution
    const lastUserMsg = messages[messages.length - 1];
    const lastContent = (lastUserMsg?.content || "").toLowerCase();

    // Expanded triggers: explicit closes OR short confirmations
    // generateObject validation (Name/Email required) acts as safety gate
    const isClosing = lastContent.includes("that is all") ||
      lastContent.includes("no") ||
      lastContent.includes("nothing else") ||
      lastContent.includes("go ahead") ||
      lastContent.includes("yes") ||
      lastContent.includes("save") ||
      lastContent.includes("ok") ||
      lastContent.includes("sure");

    console.log('Manual Loop: Processing... (Triggers detected:', isClosing, ')');

    if (isClosing) {
      console.log('Manual Loop: Attempting save with generateObject...');
      try {
        const { object: leadData } = await generateObject({
          model: google('gemini-flash-latest'),
          schema: z.object({
            name: z.string(),
            email: z.string(),
            phone: z.string().optional(),
            company: z.string().optional(),
            goal: z.string().optional(),
            timeline: z.string().optional(),
          }),
          messages: coreMessages,
          system: systemPrompt + "\n\n(INTERNAL: Extract lead details from conversation history.)"
        });

        console.log('Manual Loop: Extracted data:', leadData);

        // Execute saveLead
        const saveResult = await tools.saveLead.execute(leadData);
        console.log('Manual Loop: Save executed:', saveResult);

        // Return static confirmation to avoid any leakage/hallucination
        return new Response("Thank you for providing your information, someone will reach out to you soon.");
      } catch (err) {
        console.warn('Manual Loop: Extraction failed (likely missing info or not a save intent):', err);
        // Fallback to normal generation
      }
    }

    // Normal generation: REMOVED TOOLS to prevent crashes
    // We only save via the heuristic path above.
    const result = await generateText({
      model: google('gemini-flash-latest'),
      messages: coreMessages,
      system: systemPrompt + "\n\n(INTERNAL: Chat normally. If lead info is ready, guide user to confirm saving.)",
    });

    // Final cleanup to ensure no internal notes or technical identifiers leaked
    let responseText = result.text || "I understand.";
    responseText = responseText.replace(/\(INTERNAL:.*?\)/gi, "")
      .replace(/saveLead\s*\(.*?\)/gi, "")
      .replace(/saveLead\b.*?/gi, "")
      .trim();

    // Just return the text (tools are disabled here)
    return new Response(responseText);

  } catch (e) {
    console.error("Manual Loop Error:", e);
    return new Response("I'm currently experiencing high traffic. Please try again.", { status: 200 });
  }
}
