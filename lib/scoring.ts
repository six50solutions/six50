// lib/diagnostic/scoring.ts
// Pure functions, no I/O. Same code path scores both tiers; the tier only
// changes which questions exist. Runs server-side on submit.

import { DOMAINS, QUESTIONS, type DomainId, type Tier } from './instrument';

export type AnswerValue = {
  score?: number | null;      // resolved 0-4 for scored items
  choice?: string | null;
  choices?: string[] | null;
  text?: string | null;
  self?: number | null;       // 1-5, unscored
};
export type Answers = Record<string, AnswerValue>;

export type Flag = {
  code: string;
  severity: 'critical' | 'high' | 'medium';
  domain: DomainId | null;
  finding: string;
  internalOnly?: boolean;     // shown to Adil, not to the respondent
};

export type Divergence = { code: string; domain: DomainId | null; selfRating: number; measured: number; gap: number; inverse: boolean };

export type Play = { flagCode: string; name: string; first90: string; automation: string | null; rank: number };

export type Result = {
  ols: number;
  band: string;
  bandNote: string;
  domainScores: Record<string, number>;
  flags: Flag[];
  divergences: Divergence[];
  plays: Play[];
  automation: Play[];
  scaling: Opportunity[];
  reviewRequired: boolean;
  completeness: number;
};

const q = (key: string) => QUESTIONS.find((x) => x.key === key);
const scoreOf = (a: Answers, key: string) => a[key]?.score ?? null;
const choiceOf = (a: Answers, key: string) => a[key]?.choice ?? null;

// --- domain scoring ---------------------------------------------------------
export function domainPercentages(answers: Answers, tier: Tier): Record<string, number> {
  const out: Record<string, number> = {};
  for (const d of Object.keys(DOMAINS) as DomainId[]) {
    const items = QUESTIONS.filter(
      (x) => x.domain === d && x.type !== 'text' && x.type !== 'self' && (tier === 'full' || x.tier === 'scan'),
    );
    let raw = 0;
    let max = 0;
    for (const item of items) {
      const s = scoreOf(answers, item.key);
      if (s === null || s === undefined) continue;   // skipped items are excluded, never zeroed
      raw += s;
      max += 4;
    }
    if (max > 0) out[d] = Number((raw / max).toFixed(4));
  }
  return out;
}

export function operatingLeverageScore(pct: Record<string, number>): number {
  let weighted = 0;
  let weightUsed = 0;
  for (const [d, meta] of Object.entries(DOMAINS)) {
    if (pct[d] === undefined) continue;
    weighted += pct[d] * meta.weight;
    weightUsed += meta.weight;
  }
  if (weightUsed === 0) return 0;
  return Math.round((weighted / weightUsed) * 100);   // renormalize if domains are missing
}

const BANDS: { min: number; band: string; note: string }[] = [
  { min: 80, band: 'Systematized',  note: 'The leverage is real. The work shifts to scale and exit-readiness.' },
  { min: 65, band: 'Structured',    note: 'The bones are good. A few load-bearing gaps are doing real damage.' },
  { min: 50, band: 'Owner-Reliant', note: 'The business works because you do. That is the constraint and the risk.' },
  { min: 35, band: 'Fragile',       note: 'Growth would break something. Sequence matters more than speed.' },
  { min: 0,  band: 'At Risk',       note: 'Stabilize before optimizing. Automating this now would cement the mess.' },
];

// --- hard flags -------------------------------------------------------------
export function detectFlags(answers: Answers, pct: Record<string, number>): Flag[] {
  const f: Flag[] = [];
  const push = (
    code: string, severity: Flag['severity'], domain: DomainId | null, finding: string, internalOnly = false,
  ) => f.push({ code, severity, domain, finding, internalOnly });

  const d1q1 = choiceOf(answers, 'D1_Q1') ?? '';
  if (scoreOf(answers, 'D1_Q2') === 0 || /cash|payroll|several/i.test(d1q1)) {
    push('KEY_PERSON_CRITICAL', 'critical', 'D1',
      'Core commercial decisions have no second pair of hands. This is the single largest valuation discount in lower-middle-market deals.');
  }
  if (scoreOf(answers, 'D1_Q5') === 0 && scoreOf(answers, 'D8_Q3') === 0) {
    push('NO_SUCCESSION', 'critical', 'D8',
      'No named deputy and no written continuity plan. An unplanned absence would be an emergency rather than an inconvenience.');
  }
  const largest = scoreOf(answers, 'D5_Q1');
  const topFive = scoreOf(answers, 'D5_Q3');
  if ((largest !== null && largest <= 1) || (topFive !== null && topFive === 0)) {
    push('CONCENTRATION_SEVERE', 'critical', 'D5',
      'Customer concentration is high enough that one relationship failing would be a solvency event, not a bad quarter.');
  }
  if (scoreOf(answers, 'D4_Q1') === 0) {
    push('CLOSE_UNRELIABLE', 'high', 'D4',
      'The close is slow enough that decisions are being made on stale numbers.');
  }
  if (scoreOf(answers, 'D4_Q3') === 0) {
    push('NO_CASH_VISIBILITY', 'high', 'D4', 'No rolling cash forecast. Cash surprises are structural, not bad luck.');
  }
  if (scoreOf(answers, 'D9_Q1') === 0 || scoreOf(answers, 'D9_Q2') === 0) {
    push('SECURITY_EXPOSED', 'high', 'D9',
      'Baseline controls are missing. Cyber is now a diligence gate, and insurers are asking these exact questions.');
  }
  if (scoreOf(answers, 'D3_Q6') === 0) {
    push('DATA_HOSTAGE', 'high', 'D3', 'Data portability is unverified. Vendor leverage over you is higher than it looks.');
  }
  if (scoreOf(answers, 'D3_Q1') === 0 && (scoreOf(answers, 'D6_Q1') ?? 4) <= 1) {
    push('INTEGRATION_TAX', 'high', 'D3',
      'Fragmented systems plus heavy manual re-keying. You are paying salary for work software should be doing.');
  }
  if ((scoreOf(answers, 'D8_Q1') ?? 4) <= 1) {
    push('CONTRACT_GAP', 'high', 'D8', 'Top customer relationships are not papered in a way that survives a transaction.');
  }
  if (scoreOf(answers, 'D10_Q3') === 0 || scoreOf(answers, 'D10_Q4') === 0) {
    push('CHANGE_FATIGUE', 'medium', 'D10',
      'Past rollouts stalled or nobody owns change internally. Engagement must be shaped as installation, not advice.', true);
  }
  if (scoreOf(answers, 'D8_Q5') === 0 || scoreOf(answers, 'D9_Q5') === 0) {
    push('MANUAL_REVIEW', 'high', null, 'Disclosed legal, regulatory, or unsupported-system exposure. Review before any output leaves.', true);
  }
  if ((pct['D2'] ?? 1) < 0.5) {
    push('PROCESS_GAP', 'high', 'D2', 'Core workflows live in people rather than in systems. Nothing can be automated on top of this yet.');
  }
  return f;
}

// --- divergence -------------------------------------------------------------
const PAIRS: { code: string; selfKey: string; domain: DomainId | null }[] = [
  { code: 'DIV_OPS',     selfKey: 'T1_SELF_OPS', domain: null },
  { code: 'DIV_DOCS',    selfKey: 'D2_SELF',     domain: 'D2' },
  { code: 'DIV_FINANCE', selfKey: 'D4_SELF',     domain: 'D4' },
  { code: 'DIV_TECH',    selfKey: 'D9_SELF',     domain: 'D9' },
];

export function detectDivergences(answers: Answers, pct: Record<string, number>, ols: number, threshold = 0.3): Divergence[] {
  const out: Divergence[] = [];
  for (const p of PAIRS) {
    const self = answers[p.selfKey]?.self;
    if (!self) continue;
    const measured = p.domain ? pct[p.domain] : ols / 100;
    if (measured === undefined) continue;
    const gap = Number((self / 5 - measured).toFixed(3));
    if (Math.abs(gap) >= threshold) {
      out.push({ code: p.code, domain: p.domain, selfRating: self, measured: Number(measured.toFixed(3)), gap, inverse: gap < 0 });
    }
  }
  return out.sort((a, b) => Math.abs(b.gap) - Math.abs(a.gap));
}

// --- plays ------------------------------------------------------------------
const PLAY_BOOK: Record<string, Omit<Play, 'flagCode' | 'rank'>> = {
  KEY_PERSON_CRITICAL: { name: 'Decision Transfer', first90: 'Map every decision routing through the owner, then extract the top five into written rules with named owners.', automation: 'Rules-based quoting and approval assistant' },
  NO_SUCCESSION:       { name: 'Continuity Package', first90: 'Emergency operating memo, authority matrix, key-person coverage review.', automation: 'Auto-maintained authority register' },
  PROCESS_GAP:         { name: 'Tribal Knowledge Capture', first90: 'Record and transcribe the five core workflows; convert to living SOPs.', automation: 'AI-drafted SOPs from recorded walkthroughs; onboarding assistant' },
  INTEGRATION_TAX:     { name: 'Single Source of Truth', first90: 'System inventory, data-flow map, and the three highest-volume re-keying paths identified.', automation: 'Integration layer with nightly sync' },
  CLOSE_UNRELIABLE:    { name: 'Close & Cash Discipline', first90: 'Close calendar, month-end checklist, owner-ready reporting pack.', automation: 'Automated close tracking and variance narrative' },
  NO_CASH_VISIBILITY:  { name: 'Close & Cash Discipline', first90: 'Stand up a rolling 13-week cash model with a weekly update rhythm.', automation: 'Automated cash roll-forward' },
  CONCENTRATION_SEVERE:{ name: 'Revenue Durability', first90: 'Contract review on top accounts and retention risk scoring.', automation: 'Renewal alerting and early churn signals' },
  SECURITY_EXPOSED:    { name: 'Baseline Hardening', first90: 'MFA rollout, tested restore, offboarding checklist, cyber quote.', automation: 'Quarterly access review automation' },
  DATA_HOSTAGE:        { name: 'Data Custody', first90: 'Export test against every core vendor; review ownership terms.', automation: 'Scheduled export and archive' },
  CONTRACT_GAP:        { name: 'Commercial Hygiene', first90: 'Contract inventory, assignability review, template refresh.', automation: 'Expiry and renewal calendar' },
  CHANGE_FATIGUE:      { name: 'Adoption-First Sequencing', first90: 'Start with one workflow that produces a visible weekly win. No platform purchase in phase one.', automation: null },
};

const SEVERITY_WEIGHT = { critical: 3, high: 2, medium: 1 } as const;

export function rankPlays(flags: Flag[], pct: Record<string, number>, limit = 3): Play[] {
  const scored = flags
    .filter((f) => PLAY_BOOK[f.code] && !f.internalOnly)
    .map((f) => {
      const gap = 1 - (f.domain ? pct[f.domain] ?? 0.5 : 0.5);
      return { flag: f, weight: SEVERITY_WEIGHT[f.severity] * gap };
    })
    .sort((a, b) => b.weight - a.weight);

  // A critical flag always leads, even if a lighter play would land faster.
  const criticalFirst = [
    ...scored.filter((s) => s.flag.severity === 'critical'),
    ...scored.filter((s) => s.flag.severity !== 'critical'),
  ];

  const seen = new Set<string>();
  const plays: Play[] = [];
  for (const s of criticalFirst) {
    const book = PLAY_BOOK[s.flag.code];
    if (seen.has(book.name)) continue;              // don't recommend the same play twice
    seen.add(book.name);
    plays.push({ flagCode: s.flag.code, rank: plays.length + 1, ...book });
    if (plays.length >= limit) break;
  }
  return plays;
}

// --- scaling opportunities ---------------------------------------------------
// Flags above are deficits: what's broken. This is the complementary lens —
// where the answers show existing strength or slack that growth could be
// built on. Same answers, opposite question: not "what's wrong" but "what's
// already working that isn't being pushed."
export type Opportunity = { code: string; finding: string };

export function scalingOpportunities(answers: Answers, pct: Record<string, number>): Opportunity[] {
  const out: Opportunity[] = [];
  const push = (code: string, finding: string) => out.push({ code, finding });

  const constraint = choiceOf(answers, 'D6_Q2') ?? '';
  const turnover = scoreOf(answers, 'D6_Q4');
  if (/demand|nothing/i.test(constraint) && (turnover === null || turnover >= 3)) {
    push('CAPACITY_HEADROOM',
      'The binding constraint is demand, not delivery capacity, and the team isn\u2019t already stretched thin. There\u2019s room to take on more volume before you\u2019d need to add headcount.');
  }

  if ((pct['D5'] ?? 0) >= 0.75) {
    push('CONCENTRATION_ROOM',
      'Customer concentration is low enough that the revenue base could support an aggressive push — a new anchor account or two wouldn\u2019t create the exposure it would at a more concentrated competitor.');
  }

  const forecast = scoreOf(answers, 'D5_Q2');
  const pipeline = scoreOf(answers, 'D5_Q5');
  if ((forecast ?? 0) >= 3 && (pipeline === null || pipeline >= 2)) {
    push('FORECAST_RELIABLE',
      'Revenue forecasting is reliable enough to plan hiring, inventory, or cash needs ahead of demand rather than reacting to it after the fact.');
  }

  if (scoreOf(answers, 'D10_Q3') === 4 && (scoreOf(answers, 'D10_Q4') ?? 0) >= 2) {
    push('CHANGE_READY',
      'Past system rollouts stuck rather than getting abandoned, and someone would actually own the next one. That track record makes further automation a lower-risk bet than it would be for most businesses this size.');
  }

  const ownerTime = scoreOf(answers, 'D1_Q4');
  if ((ownerTime ?? 0) >= 3) {
    push('OWNER_BANDWIDTH',
      'You\u2019re already spending most of your time working on the business rather than in it — the bandwidth to pursue a real expansion move personally already exists.');
  }

  return out.slice(0, 3);
}

export function automationOpportunities(flags: Flag[]): Play[] {
  return flags
    .filter((f) => PLAY_BOOK[f.code]?.automation && !f.internalOnly)
    .map((f) => ({ flagCode: f.code, rank: 0, ...PLAY_BOOK[f.code]! }))
    .filter((p, i, arr) => arr.findIndex((x) => x.name === p.name) === i)
    .slice(0, 3);
}

// --- entry point ------------------------------------------------------------
export function score(answers: Answers, tier: Tier): Result {
  const pct = domainPercentages(answers, tier);
  const ols = operatingLeverageScore(pct);
  const flags = detectFlags(answers, pct);
  const divergences = detectDivergences(answers, pct, ols);
  const plays = rankPlays(flags, pct);
  const automation = automationOpportunities(flags);
  const scaling = scalingOpportunities(answers, pct);
  const band = BANDS.find((b) => ols >= b.min)!;

  const scorable = QUESTIONS.filter((x) => x.domain && x.type !== 'text' && (tier === 'full' || x.tier === 'scan'));
  const answered = scorable.filter((x) => answers[x.key]?.score !== undefined && answers[x.key]?.score !== null).length;

  return {
    ols,
    band: band.band,
    bandNote: band.note,
    domainScores: pct,
    flags,
    divergences,
    plays,
    automation,
    scaling,
    // Full-tier reports always get eyes on them before sending. Free text can
    // name staff or disclose litigation, and the review is the billable judgment.
    reviewRequired: tier === 'full' || flags.some((f) => f.code === 'MANUAL_REVIEW'),
    completeness: scorable.length ? Number((answered / scorable.length).toFixed(2)) : 0,
  };
}

export function divergenceCopy(d: Divergence, domainLabel: string): string {
  const selfPct = Math.round((d.selfRating / 5) * 100);
  const measuredPct = Math.round(d.measured * 100);
  if (d.inverse) {
    return `You rated ${domainLabel.toLowerCase()} a ${d.selfRating} out of 5. Your answers put it closer to ${measuredPct}%. You are underselling a real strength here — worth knowing before you negotiate anything.`;
  }
  return `You rated ${domainLabel.toLowerCase()} a ${d.selfRating} out of 5 — about ${selfPct}%. Your other answers put the working reality closer to ${measuredPct}%. That gap is usually the most expensive line on this page, because it is the one nobody is actively fixing.`;
}
