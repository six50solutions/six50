// lib/diagnostic/instrument.ts
// Single source of truth. The form renders from this, the scorer reads from this,
// and a snapshot of it is stored in instrument_versions.definition on publish so
// any historical score can be reconstructed exactly.

export const INSTRUMENT_VERSION = '1.0';

export type Tier = 'scan' | 'full';
export type DomainId = 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6' | 'D7' | 'D8' | 'D9' | 'D10';

export type Question =
  | { key: string; domain: DomainId | null; tier: Tier; type: 'choice'; prompt: string; help?: string; options: { label: string; score: number }[] }
  | { key: string; domain: DomainId; tier: Tier; type: 'scaleA'; prompt: string; help?: string; reverse?: boolean }
  | { key: string; domain: DomainId | null; tier: Tier; type: 'self'; prompt: string; help?: string }
  | { key: string; domain: DomainId; tier: Tier; type: 'multi'; prompt: string; help?: string; options: { label: string }[]; penalty: number }
  | { key: string; domain: DomainId | null; tier: Tier; type: 'text'; prompt: string; help?: string }
  | { key: string; domain: null; tier: Tier; type: 'shortText'; prompt: string; help?: string; inputType?: 'text' | 'email' };

export const DOMAINS: Record<DomainId, { code: string; label: string; weight: number }> = {
  D1:  { code: '01', label: 'Owner Dependency',        weight: 0.15 },
  D2:  { code: '02', label: 'Process & Knowledge',     weight: 0.12 },
  D3:  { code: '03', label: 'Data & Systems',          weight: 0.12 },
  D4:  { code: '04', label: 'Financial Visibility',    weight: 0.12 },
  D5:  { code: '05', label: 'Revenue Durability',      weight: 0.11 },
  D6:  { code: '06', label: 'Labor & Capacity',        weight: 0.10 },
  D7:  { code: '07', label: 'Delivery & Quality',      weight: 0.08 },
  D8:  { code: '08', label: 'Compliance & Continuity', weight: 0.08 },
  D9:  { code: '09', label: 'Technology & Security',   weight: 0.07 },
  D10: { code: '10', label: 'AI Readiness',            weight: 0.05 },
};

export const SCALE_A = [
  { label: 'Never — doesn\u2019t exist',  score: 0 },
  { label: 'Rarely — ad hoc',            score: 1 },
  { label: 'Sometimes — partially',      score: 2 },
  { label: 'Usually — mostly',           score: 3 },
  { label: 'Always — fully systematized', score: 4 },
];

// ---------------------------------------------------------------------------
// TIER 1 — Blind Spot Scan. Every question here is also in the full tier.
// ---------------------------------------------------------------------------
export const QUESTIONS: Question[] = [
  { key: 'T1_SELF_OPS', domain: null, tier: 'scan', type: 'self',
    prompt: 'Overall, how well-run is the operational side of your business?',
    help: 'Your gut answer. We come back to this at the end.' },

  { key: 'D1_Q1', domain: 'D1', tier: 'scan', type: 'choice',
    prompt: 'If you were unreachable for 30 straight days, what would break first?',
    options: [
      { label: 'Nothing meaningful', score: 4 },
      { label: 'Some decisions would wait for me', score: 3 },
      { label: 'Sales would stall', score: 1 },
      { label: 'Cash or payroll decisions', score: 0 },
      { label: 'Several of these at once', score: 0 },
    ] },

  { key: 'D1_Q2', domain: 'D1', tier: 'scan', type: 'choice',
    prompt: 'Besides you, how many people can quote or price a typical job without asking anyone?',
    options: [
      { label: 'Three or more', score: 4 },
      { label: 'Two', score: 3 },
      { label: 'One', score: 1 },
      { label: 'Nobody', score: 0 },
    ] },

  { key: 'D2_Q1', domain: 'D2', tier: 'scan', type: 'choice',
    prompt: 'Of your five most important recurring workflows, how many are written down well enough for a new hire to follow?',
    options: [
      { label: 'All five', score: 4 },
      { label: 'Three or four', score: 3 },
      { label: 'One or two', score: 1 },
      { label: 'None', score: 0 },
    ] },

  { key: 'D2_SELF', domain: 'D2', tier: 'scan', type: 'self',
    prompt: 'How well-documented would you say your processes are?' },

  { key: 'D3_Q1', domain: 'D3', tier: 'scan', type: 'choice',
    prompt: 'To answer \u201chow did we do last month?\u201d, how many separate systems or files do you open?',
    options: [
      { label: 'One', score: 4 },
      { label: 'Two', score: 3 },
      { label: 'Three or four', score: 2 },
      { label: 'Five or more', score: 0 },
    ] },

  { key: 'D3_Q2', domain: 'D3', tier: 'scan', type: 'scaleA', reverse: true,
    prompt: 'How often does the same information get typed into more than one system by hand?' },

  { key: 'D4_Q1', domain: 'D4', tier: 'scan', type: 'choice',
    prompt: 'How many days after month-end do you have financials you\u2019d actually make a decision on?',
    options: [
      { label: '10 days or fewer', score: 4 },
      { label: '11 to 20 days', score: 3 },
      { label: '21 to 35 days', score: 2 },
      { label: '36+ days, or we don\u2019t really close', score: 0 },
    ] },

  { key: 'D4_Q2', domain: 'D4', tier: 'scan', type: 'choice',
    prompt: 'Right now, without pulling anything together — do you know last quarter\u2019s gross margin by service line?',
    options: [
      { label: 'Yes, it\u2019s on a live dashboard', score: 4 },
      { label: 'Yes, approximately, from memory', score: 2 },
      { label: 'I\u2019d have to build it', score: 1 },
      { label: 'We don\u2019t track it that way', score: 0 },
    ] },

  { key: 'D5_Q1', domain: 'D5', tier: 'scan', type: 'choice',
    prompt: 'What share of revenue comes from your largest customer?',
    options: [
      { label: 'Under 10%', score: 4 },
      { label: '10\u201319%', score: 3 },
      { label: '20\u201334%', score: 2 },
      { label: '35\u201349%', score: 1 },
      { label: '50% or more', score: 0 },
    ] },

  { key: 'D5_Q2', domain: 'D5', tier: 'scan', type: 'choice',
    prompt: 'How close is your 90-day revenue forecast, typically?',
    options: [
      { label: 'Within 5%', score: 4 },
      { label: 'Within 15%', score: 3 },
      { label: 'Within 30%', score: 1 },
      { label: 'We don\u2019t forecast', score: 0 },
    ] },

  { key: 'D6_Q1', domain: 'D6', tier: 'scan', type: 'choice',
    prompt: 'Roughly how many hours a week does your team spend re-keying data, chasing status, or rebuilding the same report?',
    options: [
      { label: 'Under 5', score: 4 },
      { label: '5 to 15', score: 3 },
      { label: '16 to 30', score: 1 },
      { label: 'More than 30', score: 0 },
    ] },

  { key: 'D8_Q1', domain: 'D8', tier: 'scan', type: 'scaleA',
    prompt: 'Are your top-10 customer relationships covered by signed, current, assignable contracts?' },

  { key: 'D10_Q1', domain: 'D10', tier: 'scan', type: 'choice',
    prompt: 'Has your team used AI tools for real work in the last six months?',
    options: [
      { label: 'Yes, in production workflows', score: 4 },
      { label: 'Yes, experiments', score: 3 },
      { label: 'A few people informally', score: 2 },
      { label: 'No', score: 1 },
      { label: 'We actively discourage it', score: 0 },
    ] },

  // -------------------------------------------------------------------------
  // TIER 2 — full intake
  // -------------------------------------------------------------------------
  { key: 'D1_Q3', domain: 'D1', tier: 'full', type: 'multi', penalty: 0.5,
    prompt: 'Which of these still route through you?',
    options: [
      { label: 'Pricing exceptions' }, { label: 'Vendor selection' }, { label: 'Hiring decisions' },
      { label: 'Collections calls' }, { label: 'Scheduling' }, { label: 'Customer escalations' },
      { label: 'Approving spend under $5k' },
    ] },
  { key: 'D1_Q4', domain: 'D1', tier: 'full', type: 'choice',
    prompt: 'Your own hours: working *in* the business versus *on* it.',
    options: [
      { label: 'Mostly on', score: 4 }, { label: 'Balanced', score: 3 },
      { label: 'Mostly in', score: 1 }, { label: 'Entirely in', score: 0 },
    ] },
  { key: 'D1_Q5', domain: 'D1', tier: 'full', type: 'choice',
    prompt: 'Is there a named second-in-command with real decision authority?',
    options: [
      { label: 'Yes, and the team knows it', score: 4 },
      { label: 'Yes, on paper', score: 2 },
      { label: 'No', score: 0 },
    ] },
  { key: 'D1_Q6', domain: 'D1', tier: 'full', type: 'choice',
    prompt: 'When did you last take seven consecutive days off without daily contact?',
    options: [
      { label: 'Within 6 months', score: 4 }, { label: '6 to 18 months ago', score: 2 },
      { label: 'More than 18 months ago', score: 1 }, { label: 'Never', score: 0 },
    ] },

  { key: 'D2_Q2', domain: 'D2', tier: 'full', type: 'choice',
    prompt: 'Where does documentation actually live?',
    options: [
      { label: 'A shared system, kept current', score: 4 },
      { label: 'A shared system, gone stale', score: 2 },
      { label: 'Scattered files and folders', score: 1 },
      { label: 'People\u2019s heads', score: 0 },
    ] },
  { key: 'D2_Q3', domain: 'D2', tier: 'full', type: 'choice',
    prompt: 'How long until a new hire is productive in a core role?',
    options: [
      { label: 'Under 2 weeks', score: 4 }, { label: '2 to 6 weeks', score: 3 },
      { label: '2 to 4 months', score: 1 }, { label: 'More than 4 months', score: 0 },
    ] },
  { key: 'D2_Q4', domain: 'D2', tier: 'full', type: 'scaleA', reverse: true,
    prompt: 'When someone leaves, how much knowledge leaves with them?' },
  { key: 'D2_Q5', domain: 'D2', tier: 'full', type: 'text',
    prompt: 'Which single process would do the most damage if the person who owns it left tomorrow?' },

  { key: 'D3_Q3', domain: 'D3', tier: 'full', type: 'text',
    prompt: 'List your core systems — accounting, CRM, operations, payroll, scheduling, anything else.' },
  { key: 'D3_Q4', domain: 'D3', tier: 'full', type: 'scaleA',
    prompt: 'Do your operational systems feed the accounting system automatically?' },
  { key: 'D3_Q5', domain: 'D3', tier: 'full', type: 'choice',
    prompt: 'Is there one place to look up a customer\u2019s full history?',
    options: [{ label: 'Yes', score: 4 }, { label: 'Partially', score: 2 }, { label: 'No', score: 0 }] },
  { key: 'D3_Q6', domain: 'D3', tier: 'full', type: 'choice',
    prompt: 'If you left a software vendor tomorrow, do you own and control your data?',
    options: [
      { label: 'Yes — we\u2019ve tested an export', score: 4 },
      { label: 'We believe so, never tested', score: 2 },
      { label: 'Unsure', score: 0 },
    ] },

  { key: 'D4_SELF', domain: 'D4', tier: 'full', type: 'self',
    prompt: 'How strong is your financial visibility?' },
  { key: 'D4_Q3', domain: 'D4', tier: 'full', type: 'choice',
    prompt: 'Do you keep a rolling 13-week cash forecast?',
    options: [
      { label: 'Yes, updated weekly', score: 4 },
      { label: 'Yes, occasionally', score: 2 },
      { label: 'No', score: 0 },
    ] },
  { key: 'D4_Q4', domain: 'D4', tier: 'full', type: 'choice',
    prompt: 'Are the books kept on accrual or cash basis?',
    options: [
      { label: 'Accrual, reviewed', score: 4 }, { label: 'Accrual, loosely', score: 3 },
      { label: 'Cash basis', score: 1 },
    ] },
  { key: 'D4_Q5', domain: 'D4', tier: 'full', type: 'scaleA',
    prompt: 'Can you see profitability at the job or project level?' },
  { key: 'D4_Q6', domain: 'D4', tier: 'full', type: 'choice',
    prompt: 'Who prepares your financials?',
    options: [
      { label: 'Internal controller or CFO', score: 4 },
      { label: 'Internal bookkeeper plus outside CPA', score: 3 },
      { label: 'Outside bookkeeper only', score: 2 },
      { label: 'Me, or a family member', score: 1 },
    ] },
  { key: 'D4_Q7', domain: 'D4', tier: 'full', type: 'choice',
    prompt: 'Have you had a Quality of Earnings review or an audit?',
    options: [
      { label: 'Yes, within 2 years', score: 4 }, { label: 'Yes, longer ago', score: 3 },
      { label: 'No', score: 1 },
    ] },

  { key: 'D5_Q3', domain: 'D5', tier: 'full', type: 'choice',
    prompt: 'Your top five customers, as a share of revenue.',
    options: [
      { label: 'Under 25%', score: 4 }, { label: '25\u201339%', score: 3 },
      { label: '40\u201359%', score: 2 }, { label: '60% or more', score: 0 },
    ] },
  { key: 'D5_Q4', domain: 'D5', tier: 'full', type: 'choice',
    prompt: 'How much of your revenue is recurring or contracted?',
    options: [
      { label: 'Over 60%', score: 4 }, { label: '30\u201360%', score: 3 },
      { label: '10\u201329%', score: 2 }, { label: 'Under 10%', score: 1 },
    ] },
  { key: 'D5_Q5', domain: 'D5', tier: 'full', type: 'choice',
    prompt: 'Can you see the pipeline without asking the sales team?',
    options: [
      { label: 'Yes, live', score: 4 }, { label: 'Yes, if someone updates it', score: 2 },
      { label: 'No', score: 0 },
    ] },
  { key: 'D5_Q6', domain: 'D5', tier: 'full', type: 'choice',
    prompt: 'Do you know your customer acquisition cost and retention rate?',
    options: [
      { label: 'Both, tracked', score: 4 }, { label: 'One of them', score: 2 },
      { label: 'Neither', score: 0 },
    ] },

  { key: 'D6_Q2', domain: 'D6', tier: 'full', type: 'choice',
    prompt: 'What\u2019s your binding constraint right now?',
    options: [
      { label: 'Nothing — we have room', score: 4 },
      { label: 'Demand', score: 3 },
      { label: 'Skilled labor', score: 1 },
      { label: 'Working capital', score: 1 },
      { label: 'Systems and admin throughput', score: 1 },
      { label: 'My own time', score: 0 },
    ] },
  { key: 'D6_Q3', domain: 'D6', tier: 'full', type: 'scaleA', reverse: true,
    prompt: 'How routinely do you rely on overtime or temp labor to keep up?' },
  { key: 'D6_Q4', domain: 'D6', tier: 'full', type: 'choice',
    prompt: 'Voluntary turnover over the last 12 months.',
    options: [
      { label: 'Under 10%', score: 4 }, { label: '10\u201320%', score: 3 },
      { label: '21\u201335%', score: 1 }, { label: 'Over 35%', score: 0 },
    ] },
  { key: 'D6_Q5', domain: 'D6', tier: 'full', type: 'text',
    prompt: 'If volume rose 30% next quarter, what breaks first?' },

  { key: 'D7_Q1', domain: 'D7', tier: 'full', type: 'scaleA',
    prompt: 'Do you measure on-time delivery or first-time-right?' },
  { key: 'D7_Q2', domain: 'D7', tier: 'full', type: 'choice',
    prompt: 'Rework, warranty, and credits as a share of revenue.',
    options: [
      { label: 'Under 1%', score: 4 }, { label: '1\u20133%', score: 3 },
      { label: '4\u20137%', score: 1 }, { label: 'Over 7%, or we don\u2019t know', score: 0 },
    ] },
  { key: 'D7_Q3', domain: 'D7', tier: 'full', type: 'choice',
    prompt: 'How do customer complaints reach you?',
    options: [
      { label: 'Through a system that tracks them', score: 4 },
      { label: 'An email inbox', score: 2 },
      { label: 'They call me directly', score: 1 },
      { label: 'I don\u2019t hear about most of them', score: 0 },
    ] },
  { key: 'D7_Q4', domain: 'D7', tier: 'full', type: 'choice',
    prompt: 'Do you survey customers or track NPS?',
    options: [
      { label: 'Systematically', score: 4 }, { label: 'Occasionally', score: 2 },
      { label: 'No', score: 0 },
    ] },

  { key: 'D8_Q2', domain: 'D8', tier: 'full', type: 'scaleA',
    prompt: 'Are licenses, permits, and insurance certificates tracked with expiry alerts?' },
  { key: 'D8_Q3', domain: 'D8', tier: 'full', type: 'choice',
    prompt: 'Is there a written succession or emergency plan if you were suddenly out?',
    options: [
      { label: 'Yes, documented', score: 4 },
      { label: 'An informal understanding', score: 1 },
      { label: 'None', score: 0 },
    ] },
  { key: 'D8_Q4', domain: 'D8', tier: 'full', type: 'choice',
    prompt: 'Key-person life or disability insurance in place?',
    options: [{ label: 'Yes', score: 4 }, { label: 'No', score: 1 }] },
  { key: 'D8_Q5', domain: 'D8', tier: 'full', type: 'choice',
    prompt: 'Any active or threatened litigation, audits, or regulatory matters?',
    options: [
      { label: 'No', score: 4 }, { label: 'Resolved recently', score: 3 },
      { label: 'Yes', score: 0 },
    ] },
  { key: 'D8_Q6', domain: 'D8', tier: 'full', type: 'scaleA',
    prompt: 'Do key staff have confidentiality, IP assignment, and non-solicit terms in place?' },

  { key: 'D9_SELF', domain: 'D9', tier: 'full', type: 'self',
    prompt: 'How would you rate your technology and security posture?' },
  { key: 'D9_Q1', domain: 'D9', tier: 'full', type: 'choice',
    prompt: 'Is multi-factor authentication enforced on email and financial systems?',
    options: [
      { label: 'Everywhere', score: 4 }, { label: 'Some systems', score: 2 },
      { label: 'No', score: 0 },
    ] },
  { key: 'D9_Q2', domain: 'D9', tier: 'full', type: 'choice',
    prompt: 'Backups — do they exist, and has a restore been tested?',
    options: [
      { label: 'Yes, and we\u2019ve tested a restore', score: 4 },
      { label: 'Backups exist, never tested', score: 2 },
      { label: 'Unsure', score: 0 },
    ] },
  { key: 'D9_Q3', domain: 'D9', tier: 'full', type: 'choice',
    prompt: 'What happens to system access when someone leaves?',
    options: [
      { label: 'Documented offboarding checklist', score: 4 },
      { label: 'Handled ad hoc', score: 1 },
      { label: 'Nothing formal', score: 0 },
    ] },
  { key: 'D9_Q4', domain: 'D9', tier: 'full', type: 'choice',
    prompt: 'Do you carry cyber insurance?',
    options: [{ label: 'Yes', score: 4 }, { label: 'No', score: 1 }, { label: 'Unsure', score: 0 }] },
  { key: 'D9_Q5', domain: 'D9', tier: 'full', type: 'choice',
    prompt: 'Any system you depend on that\u2019s out of support, or that only one person or vendor can maintain?',
    options: [{ label: 'No', score: 4 }, { label: 'Yes', score: 0 }] },

  { key: 'D10_Q2', domain: 'D10', tier: 'full', type: 'choice',
    prompt: 'Is there a written policy on AI tool use?',
    options: [
      { label: 'Yes', score: 4 }, { label: 'In progress', score: 2 },
      { label: 'No', score: 1 }, { label: 'Blanket ban', score: 0 },
    ] },
  { key: 'D10_Q3', domain: 'D10', tier: 'full', type: 'choice',
    prompt: 'How have past system rollouts gone?',
    options: [
      { label: 'Adopted and stuck', score: 4 }, { label: 'Mixed', score: 2 },
      { label: 'Bought and abandoned', score: 0 },
    ] },
  { key: 'D10_Q4', domain: 'D10', tier: 'full', type: 'choice',
    prompt: 'Who would own an automation initiative internally?',
    options: [
      { label: 'A named person with capacity', score: 4 },
      { label: 'A named person who\u2019s already overloaded', score: 2 },
      { label: 'Nobody', score: 0 },
    ] },
  { key: 'D10_Q5', domain: 'D10', tier: 'full', type: 'text',
    prompt: 'What would have to be true in 12 months for you to call this a win?' },
];

export const OBJECTIVES = [
  'Reduce my own day-to-day involvement',
  'Cut operating costs / do more with the same team',
  'Prepare the business to sell in the next 1\u20133 years',
  'Scale revenue without scaling headcount 1:1',
  'Fix a specific bottleneck I already know about',
] as const;

// Unscored — captured for personalization and CRM, not the diagnostic score.
export const INTAKE_QUESTIONS: Question[] = [
  { key: 'BIZ_NAME', domain: null, tier: 'scan', type: 'shortText', prompt: 'Business name' },
  { key: 'CONTACT_NAME', domain: null, tier: 'scan', type: 'shortText', prompt: 'Your name' },
  { key: 'CONTACT_EMAIL', domain: null, tier: 'scan', type: 'shortText', prompt: 'Email', inputType: 'email' },
  { key: 'OBJECTIVE', domain: null, tier: 'scan', type: 'choice', prompt: "What's the main reason you're looking at this right now?",
    options: OBJECTIVES.map((label) => ({ label, score: 0 })) } as Question,
  { key: 'PAIN_POINTS', domain: null, tier: 'scan', type: 'text',
    prompt: 'Anything specific you\u2019d like us to know \u2014 a particular pain point, bottleneck, or concern?',
    help: 'Optional. This goes straight into your recommendation \u2014 it isn\u2019t scored.' },
];

export function questionsFor(tier: Tier): Question[] {
  const scored = tier === 'scan' ? QUESTIONS.filter((q) => q.tier === 'scan') : QUESTIONS;
  return [...INTAKE_QUESTIONS, ...scored];
}

export function questionsByDomain(tier: Tier) {
  const list = questionsFor(tier);
  return (Object.keys(DOMAINS) as DomainId[])
    .map((d) => ({ domain: d, ...DOMAINS[d], questions: list.filter((q) => q.domain === d) }))
    .filter((g) => g.questions.length > 0);
}

export const INTRO_QUESTIONS = [...INTAKE_QUESTIONS, ...QUESTIONS.filter((q) => q.domain === null)];
