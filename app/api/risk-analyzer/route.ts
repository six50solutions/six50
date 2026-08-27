import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  scoreRiskAnalyzer,
  type RiskAnalyzerInput,
  type RiskAnalyzerResult,
} from '@/lib/risk-scoring';

// Next 16 removed the edge runtime for route handlers in this repo — keep nodejs.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NOTIFY_TO = 'contact@six50.io';
const NOTIFY_FROM = 'six50 Risk Analyzer <analyzer@six50.io>';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } },
);

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

const asArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return bad('Malformed request body.');
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return bad('A valid email address is required.');
  }

  // Honeypot — bots fill hidden fields, humans do not.
  if (typeof body.website === 'string' && body.website.length > 0) {
    return NextResponse.json({ ok: true, id: null });
  }

  const input: RiskAnalyzerInput = {
    companyName: typeof body.companyName === 'string' ? body.companyName.trim() : '',
    founderName: typeof body.founderName === 'string' ? body.founderName.trim() : '',
    email,
    revenueRange: typeof body.revenueRange === 'string' ? body.revenueRange : '',
    entryLevelPct: Number.isFinite(Number(body.entryLevelPct))
      ? Math.min(100, Math.max(0, Number(body.entryLevelPct)))
      : 0,
    automatableRoles: asArray(body.automatableRoles) as RiskAnalyzerInput['automatableRoles'],
    governanceControls: asArray(
      body.governanceControls,
    ) as RiskAnalyzerInput['governanceControls'],
    ldProgram: (typeof body.ldProgram === 'string'
      ? body.ldProgram
      : '') as RiskAnalyzerInput['ldProgram'],
  };

  // Score server-side. The client gauge is a preview; this is the record of truth.
  const result = scoreRiskAnalyzer(input);

  const { data, error } = await supabase
    .from('gates_audit_responses')
    .insert({
      company_name: input.companyName || null,
      founder_name: input.founderName || null,
      email: input.email,
      revenue_range: input.revenueRange || null,
      entry_level_pct: input.entryLevelPct,
      automatable_roles: input.automatableRoles,
      governance_controls: input.governanceControls,
      ld_program: input.ldProgram || null,
      displacement_score: result.displacementScore,
      governance_score: result.governanceScore,
      capability_score: result.capabilityScore,
      overall_score: result.overallScore,
      readiness_level: result.readinessLevel,
      strengths: result.strengths,
      gaps: result.gaps,
      recommendations: result.recommendations,
      submitted: true,
      source: 'risk_analyzer',
      referrer: request.headers.get('referer'),
    })
    .select('id')
    .single();

  if (error) {
    console.error('[risk-analyzer] supabase insert failed', error);
    return bad('We could not save your submission. Please try again.', 500);
  }

  // Email is best-effort: a delivery failure must not cost us the lead record.
  let emailStatus: 'sent' | 'failed' = 'sent';
  let emailError: string | null = null;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: [NOTIFY_TO],
        reply_to: input.email,
        subject: `Risk Analyzer — ${input.companyName || input.email} scored ${result.overallScore}/100 (${result.readinessLevel})`,
        html: renderNotification(input, result, data.id),
      }),
    });
    if (!res.ok) {
      emailStatus = 'failed';
      emailError = `${res.status} ${await res.text()}`.slice(0, 500);
    }
  } catch (err) {
    emailStatus = 'failed';
    emailError = String(err).slice(0, 500);
  }

  if (emailStatus === 'failed') console.error('[risk-analyzer] resend failed', emailError);

  await supabase
    .from('gates_audit_responses')
    .update({
      email_status: emailStatus,
      email_error: emailError,
      notified_at: new Date().toISOString(),
    })
    .eq('id', data.id);

  return NextResponse.json({
    ok: true,
    id: data.id,
    overallScore: result.overallScore,
    readinessLevel: result.readinessLevel,
  });
}

// ---------------------------------------------------------------------------
// Internal notification email
// ---------------------------------------------------------------------------

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function renderNotification(
  input: RiskAnalyzerInput,
  r: RiskAnalyzerResult,
  id: number | string,
): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap">${esc(label)}</td>
      <td style="padding:6px 0;color:#111827;font-size:13px">${esc(value) || '—'}</td></tr>`;

  const list = (items: { title: string; detail: string }[]) =>
    items.length
      ? items
          .map(
            (i) =>
              `<li style="margin-bottom:10px"><strong style="color:#111827">${esc(i.title)}</strong><br>
                <span style="color:#4b5563">${esc(i.detail)}</span></li>`,
          )
          .join('')
      : '<li style="color:#6b7280">None flagged.</li>';

  const recs = r.recommendations
    .map(
      (rec) =>
        `<li style="margin-bottom:10px"><strong>${esc(rec.horizon)} · ${esc(rec.pillar)}</strong><br>
          <span style="color:#111827">${esc(rec.action)}</span><br>
          <span style="color:#6b7280;font-size:13px">${esc(rec.why)}</span></li>`,
    )
    .join('');

  return `
<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px;color:#111827">
  <p style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6b7280;margin:0 0 4px">
    six50 · AI Risk Analyzer
  </p>
  <h2 style="margin:0 0 4px;font-size:22px">
    ${esc(input.companyName || 'Unnamed company')} — ${r.overallScore}/100
  </h2>
  <p style="margin:0 0 20px;color:#4b5563">
    Readiness level: <strong>${esc(r.readinessLevel)}</strong> ·
    Displacement ${r.displacementScore} · Governance ${r.governanceScore} · Capability ${r.capabilityScore}
  </p>

  <table style="border-collapse:collapse;margin-bottom:24px">
    ${row('Contact', input.founderName || '')}
    ${row('Email', input.email)}
    ${row('Revenue', input.revenueRange || '')}
    ${row('Entry-level headcount', `${input.entryLevelPct}%`)}
    ${row('Automatable roles', input.automatableRoles.join(', '))}
    ${row('Governance controls', input.governanceControls.join(', '))}
    ${row('L&D program', input.ldProgram || '')}
    ${row('Submission ID', String(id))}
  </table>

  <h3 style="font-size:15px;margin:0 0 8px">Strengths</h3>
  <ul style="padding-left:18px;margin:0 0 20px">${list(r.strengths)}</ul>

  <h3 style="font-size:15px;margin:0 0 8px">Areas for improvement</h3>
  <ul style="padding-left:18px;margin:0 0 20px">${list(r.gaps)}</ul>

  <h3 style="font-size:15px;margin:0 0 8px">Recommended actions</h3>
  <ul style="padding-left:18px;margin:0 0 24px">${recs}</ul>

  <p style="font-size:12px;color:#9ca3af;border-top:1px solid #e5e7eb;padding-top:12px">
    Reply to this email to respond directly to ${esc(input.email)}. Target follow-up: 48 hours.
  </p>
</div>`;
}
