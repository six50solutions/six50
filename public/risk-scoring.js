/**
 * six50 AI Risk Analyzer — scoring engine (single source of truth).
 *
 * Imported by public/risk-analyzer.html (live gauge) and api/submit-audit.js
 * (the scores actually persisted and emailed). Never duplicate this logic.
 *
 * Methodology: six50-AI-Risk-Analyzer-Methodology.docx
 *
 * IMPORTANT: this is a READINESS score. Higher is better. Bad answers LOWER it.
 * The previous version added points for bad answers, which inverted the result.
 */

export const AUTOMATABLE_ROLES = {
  'auto-cs': 'Customer Service / Support',
  'auto-acct': 'Accounting / Bookkeeping',
  'auto-dev': 'Junior Software Dev / QA',
};

export const GOVERNANCE_CONTROLS = {
  'gov-policy': 'Written AI governance policy',
  'gov-audit': 'Audit trails & logging for AI decisions',
  'gov-fair': 'Bias / fairness review process',
};

export const LD_LABELS = {
  structured: 'Yes, structured program',
  adhoc: 'Ad-hoc / informal',
  none: 'No formal program',
};

/** Pillar weights. Sum to 1.0. */
export const WEIGHTS = { displacement: 0.35, governance: 0.4, capability: 0.25 };

/**
 * Governance controls are a maturity ladder, not equal peers. Audit trails carry
 * the most weight: the only control that produces after-the-fact evidence.
 */
const GOVERNANCE_POINTS = { 'gov-policy': 30, 'gov-audit': 40, 'gov-fair': 30 };

const LD_POINTS = { structured: 100, adhoc: 45, none: 10 };

/** Entry-level share at or above this is full exposure. Some juniors are normal. */
const ENTRY_LEVEL_CEILING = 60;

/** Divisor of 4 (not 3) leaves a 10-point floor when all three roles are flagged. */
const BREADTH_DIVISOR = 4;

const clamp = (n, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, n));

/** 60 pts entry-level concentration + 40 pts automatable breadth. */
export function scoreDisplacement(entryLevelPct, roleKeys) {
  const pct = clamp(Number(entryLevelPct) || 0);
  const concentration =
    60 * (1 - Math.min(pct, ENTRY_LEVEL_CEILING) / ENTRY_LEVEL_CEILING);
  const breadth = 40 * (1 - Math.min(roleKeys.length, 3) / BREADTH_DIVISOR);
  return Math.round(concentration + breadth);
}

/** Weighted control ladder, 0-100. */
export function scoreGovernance(controlKeys) {
  return controlKeys.reduce((t, k) => t + (GOVERNANCE_POINTS[k] || 0), 0);
}

/** "none" floors at 10, not 0 — on-the-job learning still happens. */
export function scoreCapability(ldProgram) {
  return LD_POINTS[ldProgram] || 0;
}

export function readinessLevel(overall) {
  if (overall >= 80) return 'Prepared';
  if (overall >= 60) return 'Developing';
  if (overall >= 40) return 'Exposed';
  return 'Critical';
}

export const LEVEL_MESSAGE = {
  Prepared:
    'Risks are managed across all three pillars. The remaining work is optimization and confirming controls operate as documented.',
  Developing:
    'Foundations are in place. The gaps are in evidence and consistency rather than intent.',
  Exposed:
    'At least one pillar carries a material gap. Closing it is a defined piece of work, not a transformation.',
  Critical:
    'No meaningful controls across multiple pillars. A structured 90-day remediation plan is warranted.',
};

const STRENGTH_THRESHOLD = 75;
const GAP_THRESHOLD = 55;

function findings(input, s) {
  const strengths = [];
  const gaps = [];
  const roleNames = input.automatableRoles.map((k) => AUTOMATABLE_ROLES[k]).filter(Boolean);
  const controlNames = input.governanceControls.map((k) => GOVERNANCE_CONTROLS[k]).filter(Boolean);
  const missing = Object.keys(GOVERNANCE_CONTROLS)
    .filter((k) => !input.governanceControls.includes(k))
    .map((k) => GOVERNANCE_CONTROLS[k]);

  if (s.displacement >= STRENGTH_THRESHOLD) {
    strengths.push({
      pillar: 'Displacement',
      title: 'Workforce is not structurally dependent on the exposed layer',
      detail: `Entry-level staff are ${input.entryLevelPct}% of headcount and ${roleNames.length} of three high-exposure functions were flagged. A transition can be planned rather than forced.`,
    });
  } else if (s.displacement < GAP_THRESHOLD) {
    gaps.push({
      pillar: 'Displacement',
      title: 'Concentrated exposure in roles AI compresses first',
      detail: `Entry-level staff are ${input.entryLevelPct}% of headcount, and ${roleNames.length} of three high-exposure functions were flagged${roleNames.length ? ` (${roleNames.join(', ')})` : ''}. This is a capacity-planning risk before it is a cost risk — the junior layer is also the pipeline for mid-level judgment roles.`,
    });
  }

  if (s.governance >= STRENGTH_THRESHOLD) {
    strengths.push({
      pillar: 'Governance',
      title: 'Governance controls are in place and evidenceable',
      detail: `${controlNames.length} of three controls are established (${controlNames.join(', ')}). This is what an acquirer, insurer, or regulator asks to see documented.`,
    });
  } else if (s.governance < GAP_THRESHOLD) {
    gaps.push({
      pillar: 'Governance',
      title: 'Liability exposure is not yet controlled',
      detail: `${missing.length} of three controls are absent (${missing.join(', ')}). Without audit trails in particular, there is no way to reconstruct why an AI-assisted decision was made — the question asked after something goes wrong, not before.`,
    });
  }

  if (s.capability >= STRENGTH_THRESHOLD) {
    strengths.push({
      pillar: 'Capability',
      title: 'Deliberate capability development already exists',
      detail:
        'A structured L&D program is in place. The infrastructure to retrain staff into AI-augmented roles exists; it needs redirection toward judgment and oversight skills, not creation from scratch.',
    });
  } else if (s.capability < GAP_THRESHOLD) {
    gaps.push({
      pillar: 'Capability',
      title: 'No deliberate defense against capability atrophy',
      detail: `Learning and development is reported as "${LD_LABELS[input.ldProgram] || 'not specified'}". Where AI absorbs the routine work through which judgment is normally built, the skill loss is slow, invisible, and expensive to reverse.`,
    });
  }

  return { strengths, gaps };
}

function recommendations(input, s) {
  const recs = [];
  const has = (k) => input.governanceControls.includes(k);

  if (!has('gov-audit')) {
    recs.push({
      pillar: 'Governance',
      horizon: '30 days',
      action:
        'Stand up decision logging for every AI-assisted process that touches a customer, an employee, or a dollar. Capture input, tool, output, and the human who approved it.',
      why: 'The only control that produces evidence after the fact, and the cheapest to add before AI usage scales past the point of reconstruction.',
    });
  }
  if (!has('gov-policy')) {
    recs.push({
      pillar: 'Governance',
      horizon: '30 days',
      action:
        'Publish a one-page AI use policy: approved tools, prohibited data, required human review points, and a named owner.',
      why: 'Shadow AI use is already happening at this revenue scale. A short policy people read beats a long one that sits in a drive.',
    });
  }
  if (!has('gov-fair')) {
    recs.push({
      pillar: 'Governance',
      horizon: '90 days',
      action:
        'Add a fairness review step to any AI-assisted hiring, pricing, credit, or performance decision.',
      why: 'The four categories regulators are actively examining, and where a bad outcome is hardest to defend without documented process.',
    });
  }
  if (s.displacement < STRENGTH_THRESHOLD) {
    recs.push({
      pillar: 'Displacement',
      horizon: '60 days',
      action:
        'Map each flagged function to one of three paths — automate and redeploy, augment and retain, or hold — with headcount and a date attached to each.',
      why: 'The decision gets made either deliberately over 60 days or reactively in a quarter when margin pressure forces it.',
    });
  }
  if (s.capability < STRENGTH_THRESHOLD) {
    recs.push({
      pillar: 'Capability',
      horizon: '90 days',
      action:
        'Define the three judgment skills the business cannot afford to lose, and protect the work that builds them from full automation.',
      why: 'Capability atrophy has no alert. It surfaces years later as an inability to staff senior roles from within.',
    });
  }
  if (!recs.length) {
    recs.push({
      pillar: 'Governance',
      horizon: '90 days',
      action:
        'Move from controls-in-place to controls-tested: sample recent AI-assisted decisions and confirm the audit trail actually reconstructs them.',
      why: 'At this readiness level the remaining risk is that documented controls are not operating as described.',
    });
  }
  return recs;
}

/**
 * @param {{entryLevelPct:number, automatableRoles:string[],
 *          governanceControls:string[], ldProgram:string}} input
 */
export function scoreAll(input) {
  const roles = Array.isArray(input.automatableRoles) ? input.automatableRoles : [];
  const controls = Array.isArray(input.governanceControls) ? input.governanceControls : [];

  const displacement = scoreDisplacement(input.entryLevelPct, roles);
  const governance = scoreGovernance(controls);
  const capability = scoreCapability(input.ldProgram);
  const overall = Math.round(
    displacement * WEIGHTS.displacement +
      governance * WEIGHTS.governance +
      capability * WEIGHTS.capability,
  );

  const normalized = {
    entryLevelPct: clamp(Number(input.entryLevelPct) || 0),
    automatableRoles: roles,
    governanceControls: controls,
    ldProgram: input.ldProgram || '',
  };
  const pillars = { displacement, governance, capability };
  const { strengths, gaps } = findings(normalized, pillars);

  return {
    displacement,
    governance,
    capability,
    overall,
    level: readinessLevel(overall),
    message: LEVEL_MESSAGE[readinessLevel(overall)],
    strengths,
    gaps,
    recommendations: recommendations(normalized, pillars),
  };
}
