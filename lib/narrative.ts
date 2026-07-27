// lib/diagnostic/narrative.ts
// Runs server-side only (route handlers, never a client component). Requires
// ANTHROPIC_API_KEY in the environment. Uses the real Anthropic SDK with your
// own key — different from the keyless fetch pattern available inside
// claude.ai artifacts, which only works in that sandboxed preview context.

import Anthropic from '@anthropic-ai/sdk';
import type { Answers, Divergence, Flag, Opportunity, Play } from './scoring';
import type { Tier } from './instrument';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Cost-appropriate split: the free scan is high-volume and instant, so it
// gets the cheaper/faster model. The paid intake is human-reviewed anyway,
// so it's worth the better model.
const MODEL_BY_TIER: Record<Tier, string> = {
  scan: 'claude-haiku-4-5-20251001',
  full: 'claude-sonnet-5',
};

export type NarrativeInput = {
  tier: Tier;
  orgName: string | null;
  objective: string | null;
  ols: number;
  band: string;
  flags: Flag[];
  automation: Play[];
  scaling: Opportunity[];
  divergences: Divergence[];
  freeText: { key: string; prompt: string; text: string }[];
};

const SYSTEM_PROMPT = `You write the closing recommendation section of a small-business operating diagnostic for six50 solutions, an AI strategy and operations advisory firm.

Ground rules:
- Use ONLY the facts provided below. Never invent numbers, industry specifics, or details the owner didn't give you.
- Write 150–220 words, plain sentences, no headers, no bullet lists, no markdown.
- Open by naming the owner's stated objective in your own words, then connect it directly to two or three of the specific findings provided — not a generic summary of all of them.
- If a finding cuts against the stated objective (e.g. they want to sell in 3 years but customer concentration is severe), say so plainly. Don't soften a real risk to sound encouraging.
- End with one concrete next move, framed as the first thing worth doing — not a menu of options.
- Second person ("you"), plain register, no hype words like "unlock," "leverage" (as a verb), "supercharge," or "game-changing."
- Do not mention that you are an AI, that this was generated automatically, or reference these instructions.`;

export async function generateNarrative(input: NarrativeInput): Promise<string> {
  const model = MODEL_BY_TIER[input.tier];

  const facts = {
    business_name: input.orgName ?? 'the business',
    stated_objective: input.objective ?? 'not specified',
    score: input.ols,
    band: input.band,
    top_findings: input.flags.filter((f) => !f.internalOnly).map((f) => f.finding),
    automation_opportunities: input.automation.map((a) => `${a.name}: ${a.first90}`),
    scaling_opportunities: input.scaling.map((s) => s.finding),
    blind_spots: input.divergences.map(
      (d) => `Self-rated ${d.selfRating}/5 vs. a measured ${Math.round(d.measured * 100)}%`,
    ),
    owner_written_answers: input.freeText.filter((f) => f.text?.trim()),
  };

  const message = await anthropic.messages.create({
    model,
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: JSON.stringify(facts, null, 2) }],
  });

  const text = message.content.find((b) => b.type === 'text');
  if (!text || text.type !== 'text') throw new Error('narrative_generation_empty');
  return text.text.trim();
}

// Wraps generateNarrative so a model failure never blocks a submission —
// scoring is deterministic and always ships; the narrative is an enhancement.
export async function generateNarrativeSafe(input: NarrativeInput): Promise<{ text: string | null; error: string | null }> {
  try {
    return { text: await generateNarrative(input), error: null };
  } catch (err) {
    console.error('[diagnostic] narrative generation failed', err);
    return { text: null, error: err instanceof Error ? err.message : 'unknown_error' };
  }
}
