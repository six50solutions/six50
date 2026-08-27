/**
 * six50 AI Risk Analyzer — scoring engine
 *
 * Single source of truth. Imported by the client component (live gauge) and by
 * the API route (persisted score + email). Never duplicate this logic.
 *
 * Methodology is documented in: six50-AI-Risk-Analyzer-Methodology.docx
 */

export const AUTOMATABLE_ROLES = [
  'Customer Service / Support',
  'Accounting / Bookkeeping',
  'Junior Software Dev / QA',
] as const;

export const GOVERNANCE_CONTROLS = [
  'Written AI governance policy',
  'Audit trails & logging for AI decisions',
  'Bias / fairness review process',
] as const;

export const LD_PROGRAMS = [
  'Yes, structured program',
  'Ad-hoc / informal',
  'No formal program',
] as const;

export type AutomatableRole = (typeof AUTOMATABLE_ROLES)[number];
export type GovernanceControl = (typeof GOVERNANCE_CONTROLS)[number];
export type LdProgram = (typeof LD_PROGRAMS)[number];

export interface RiskAnalyzerInput {
  companyName?: string;
  founderName?: string;
  email: string;
  revenueRange?: string;
  entryLevelPct: number;              // 0-100
  automatableRoles: AutomatableRole[];
  governanceControls: GovernanceControl[];
  ldProgram: LdProgram | '';
}

export interface Finding {
  pillar: 'Displacement' | 'Governance' | 'Capability';
  title: string;
  detail: string;
}

export interface Recommendation {
  pillar: 'Displacement' | 'Governance' | 'Capability';
  horizon: '30 days' | '60 days' | '90 days';
  action: string;
  why: string;
}

export interface RiskAnalyzerResult {
  displacementScore: number;
  governanceScore: number;
  capabilityScore: number;
  overallScore: number;
  readinessLevel: ReadinessLevel;
  strengths: Finding[];
  gaps: Finding[];
  recommendations: Recommendation[];
}

export type ReadinessLevel = 'Prepared' | 'Developing' | 'Exposed' | 'Critical';

/** Pillar weights. Sum to 1.0. See methodology doc for rationale. */
export const WEIGHTS = {
  displacement: 0.35,
  governance: 0.4,
  capability: 0.25,
} as const;

/**
 * Governance controls are a maturity ladder, not equal peers. Audit trails
 * carry the most weight because they are the only control that produces
 * after-the-fact evidence — the artifact a regulator, insurer, or acquirer
 * actually asks to see.
 */
const GOVERNANCE_POINTS: Record<GovernanceControl, number> = {
  'Written AI governance policy': 30,
  'Audit trails & logging for AI decisions': 40,
  'Bias / fairness review process': 30,
};

const LD_POINTS: Record<LdProgram, number> = {
  'Yes, structured program': 100,
  'Ad-hoc / informal': 45,
  'No formal program': 10,
};

/**
 * Entry-level concentration at or above this share is treated as full exposure.
 * Set at 60% rather than 50%: some junior concentration is normal and healthy in
 * a services business. Structural dependency only starts above roughly 60%.
 */
const ENTRY_LEVEL_CEILING = 60;

/**
 * Divisor for automatable-function breadth. Set to 4 rather than 3 so that a
 * business flagging all three functions still retains a floor of 10 points —
 * honest self-reporting of exposure should not zero out the pillar.
 */
const BREADTH_DIVISOR = 4;

const clamp = (n: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, n));

// ---------------------------------------------------------------------------
// Pillar scores
// ---------------------------------------------------------------------------

/**
 * Pillar 1 — Workforce Displacement Readiness (0-100).
 *   60 pts: entry-level concentration (inverse of exposure, full exposure at 60%)
 *   40 pts: breadth of automatable functions (0 of 3 selected = full marks,
 *           3 of 3 retains a 10-point floor)
 */
export function scoreDisplacement(
  entryLevelPct: number,
  automatableRoles: readonly string[],
): number {
  const pct = clamp(entryLevelPct);
  const concentration = 60 * (1 - Math.min(pct, ENTRY_LEVEL_CEILING) / ENTRY_LEVEL_CEILING);
  const breadth = 40 * (1 - Math.min(automatableRoles.length, 3) / BREADTH_DIVISOR);
  return Math.round(concentration + breadth);
}

/** Pillar 2 — AI Governance & Liability (0-100). Weighted control ladder. */
export function scoreGovernance(controls: readonly string[]): number {
  return controls.reduce(
    (total, c) => total + (GOVERNANCE_POINTS[c as GovernanceControl] ?? 0),
    0,
  );
}

/**
 * Pillar 3 — Long-Term Capability (0-100).
 * "No formal program" floors at 10 rather than 0: on-the-job learning still
 * happens. The score reflects absence of deliberate design, not of all learning.
 */
export function scoreCapability(ldProgram: string): number {
  return LD_POINTS[ldProgram as LdProgram] ?? 0;
}

export function readinessLevel(overall: number): ReadinessLevel {
  if (overall >= 80) return 'Prepared';
  if (overall >= 60) return 'Developing';
  if (overall >= 40) return 'Exposed';
  return 'Critical';
}

// ---------------------------------------------------------------------------
// Narrative: strengths, gaps, recommendations
// ---------------------------------------------------------------------------

const STRENGTH_THRESHOLD = 75;
const GAP_THRESHOLD = 55;

function buildFindings(input: RiskAnalyzerInput, s: {
  displacement: number; governance: number; capability: number;
}): { strengths: Finding[]; gaps: Finding[] } {
  const strengths: Finding[] = [];
  const gaps: Finding[] = [];
  const roles = input.automatableRoles ?? [];
  const controls = input.governanceControls ?? [];

  // --- Displacement -------------------------------------------------------
  if (s.displacement >= STRENGTH_THRESHOLD) {
    strengths.push({
      pillar: 'Displacement',
      title: 'Workforce is not structurally dependent on the exposed layer',
      detail:
        `Entry-level staff represent ${input.entryLevelPct}% of headcount and ` +
        `${roles.length} of three high-exposure functions were flagged. Delivery ` +
        `capacity does not rest on roles that AI compresses first, so a transition ` +
        `can be planned rather than forced.`,
    });
  } else if (s.displacement < GAP_THRESHOLD) {
    gaps.push({
      pillar: 'Displacement',
      title: 'Concentrated exposure in roles AI compresses first',
      detail:
        `Entry-level staff represent ${input.entryLevelPct}% of headcount, and ` +
        `${roles.length} of three high-exposure functions were flagged` +
        (roles.length ? ` (${roles.join(', ')})` : '') +
        `. This is a capacity-planning risk before it is a cost risk: the junior ` +
        `layer is also the pipeline for mid-level judgment roles.`,
    });
  }

  // --- Governance ---------------------------------------------------------
  const missing = GOVERNANCE_CONTROLS.filter((c) => !controls.includes(c));
  if (s.governance >= STRENGTH_THRESHOLD) {
    strengths.push({
      pillar: 'Governance',
      title: 'Governance controls are in place and evidenceable',
      detail:
        `${controls.length} of three controls are established` +
        (controls.length ? ` (${controls.join(', ')})` : '') +
        `. This is the strongest position of the three pillars to be in — it is ` +
        `the one an acquirer, insurer, or regulator will ask to see documented.`,
    });
  } else if (s.governance < GAP_THRESHOLD) {
    gaps.push({
      pillar: 'Governance',
      title: 'Liability exposure is not yet controlled',
      detail:
        `${missing.length} of three controls are absent (${missing.join(', ')}). ` +
        `Without audit trails in particular, there is no way to reconstruct why an ` +
        `AI-assisted decision was made — which is the question asked after something ` +
        `goes wrong, not before.`,
    });
  }

  // --- Capability ---------------------------------------------------------
  if (s.capability >= STRENGTH_THRESHOLD) {
    strengths.push({
      pillar: 'Capability',
      title: 'Deliberate capability development already exists',
      detail:
        `A structured L&D program is in place. The infrastructure to retrain staff ` +
        `into AI-augmented roles exists; it needs redirection toward judgment and ` +
        `oversight skills, not creation from scratch.`,
    });
  } else if (s.capability < GAP_THRESHOLD) {
    gaps.push({
      pillar: 'Capability',
      title: 'No deliberate defense against capability atrophy',
      detail:
        `Learning and development is reported as "${input.ldProgram || 'not specified'}". ` +
        `Where AI absorbs the routine work through which judgment is normally built, ` +
        `the skill loss is slow, invisible, and expensive to reverse.`,
    });
  }

  return { strengths, gaps };
}

function buildRecommendations(input: RiskAnalyzerInput, s: {
  displacement: number; governance: number; capability: number;
}): Recommendation[] {
  const recs: Recommendation[] = [];
  const controls = input.governanceControls ?? [];

  // Governance first when weak — it is the fastest gap to close and the one
  // that carries near-term legal and transaction exposure.
  if (!controls.includes('Audit trails & logging for AI decisions')) {
    recs.push({
      pillar: 'Governance',
      horizon: '30 days',
      action:
        'Stand up decision logging for every AI-assisted process that touches a ' +
        'customer, an employee, or a dollar. Capture input, model/tool, output, ' +
        'and the human who approved it.',
      why:
        'It is the only control that produces evidence after the fact, and it is ' +
        'the cheapest to add before AI usage scales past the point of reconstruction.',
    });
  }
  if (!controls.includes('Written AI governance policy')) {
    recs.push({
      pillar: 'Governance',
      horizon: '30 days',
      action:
        'Publish a one-page AI use policy: approved tools, prohibited data, ' +
        'required human review points, and a named owner.',
      why:
        'Shadow AI use is already happening at this revenue scale. A short policy ' +
        'that people read beats a long one that sits in a drive.',
    });
  }
  if (!controls.includes('Bias / fairness review process')) {
    recs.push({
      pillar: 'Governance',
      horizon: '90 days',
      action:
        'Add a fairness review step to any AI-assisted hiring, pricing, credit, ' +
        'or performance decision.',
      why:
        'These are the four categories regulators are actively examining, and the ' +
        'four where a bad outcome is hardest to defend without a documented process.',
    });
  }

  if (s.displacement < STRENGTH_THRESHOLD) {
    recs.push({
      pillar: 'Displacement',
      horizon: '60 days',
      action:
        'Map each flagged function to one of three paths — automate and redeploy, ' +
        'augment and retain, or hold — and attach headcount and a date to each.',
      why:
        'The decision is going to be made either deliberately over 60 days or ' +
        'reactively in a quarter when margin pressure forces it.',
    });
  }

  if (s.capability < STRENGTH_THRESHOLD) {
    recs.push({
      pillar: 'Capability',
      horizon: '90 days',
      action:
        'Define the three judgment skills the business cannot afford to lose, and ' +
        'protect the work that builds them from full automation.',
      why:
        'Capability atrophy has no alert. It surfaces years later as an inability ' +
        'to staff senior roles from within.',
    });
  }

  if (!recs.length) {
    recs.push({
      pillar: 'Governance',
      horizon: '90 days',
      action:
        'Move from controls-in-place to controls-tested: sample recent AI-assisted ' +
        'decisions and confirm the audit trail actually reconstructs them.',
      why:
        'At this readiness level the remaining risk is that documented controls are ' +
        'not operating as described.',
    });
  }

  return recs;
}

// ---------------------------------------------------------------------------
// Public entry point
// ---------------------------------------------------------------------------

export function scoreRiskAnalyzer(input: RiskAnalyzerInput): RiskAnalyzerResult {
  const displacementScore = scoreDisplacement(
    input.entryLevelPct,
    input.automatableRoles ?? [],
  );
  const governanceScore = scoreGovernance(input.governanceControls ?? []);
  const capabilityScore = scoreCapability(input.ldProgram);

  const overallScore = Math.round(
    displacementScore * WEIGHTS.displacement +
      governanceScore * WEIGHTS.governance +
      capabilityScore * WEIGHTS.capability,
  );

  const pillars = {
    displacement: displacementScore,
    governance: governanceScore,
    capability: capabilityScore,
  };

  const { strengths, gaps } = buildFindings(input, pillars);

  return {
    displacementScore,
    governanceScore,
    capabilityScore,
    overallScore,
    readinessLevel: readinessLevel(overallScore),
    strengths,
    gaps,
    recommendations: buildRecommendations(input, pillars),
  };
}
