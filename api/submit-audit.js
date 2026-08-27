import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { scoreAll, AUTOMATABLE_ROLES, GOVERNANCE_CONTROLS, LD_LABELS } from '../public/risk-scoring.js';

// Service role, not anon. The lead table has RLS on with no anon policy, so
// browser-side inserts are rejected by design — this is the only write path.
// NOTE: Vercel has NEXT_PUBLIC_SUPABASE_URL, not SUPABASE_URL. The previous
// version read SUPABASE_URL and got undefined, which threw on every request.
const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
);

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_TO = 'contact@six50.io';
const NOTIFY_FROM = 'six50 Risk Analyzer <contact@six50.io>';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const names = (keys, map) => keys.map((k) => map[k]).filter(Boolean);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      companyName, founderName, email, revenueRange,
      entryLevelPct, automatableRoles, governanceControls, ldProgram,
      website,
    } = req.body || {};

    // Honeypot — bots fill hidden fields. Return success so they learn nothing.
    if (website) return res.status(200).json({ success: true, score: null, level: null });

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    const roles = Array.isArray(automatableRoles) ? automatableRoles : [];
    const controls = Array.isArray(governanceControls) ? governanceControls : [];
    const pct = Math.min(100, Math.max(0, parseInt(entryLevelPct, 10) || 0));

    // Scored here, not in the browser. The client gauge is a preview only.
    const s = scoreAll({
      entryLevelPct: pct,
      automatableRoles: roles,
      governanceControls: controls,
      ldProgram,
    });

    const { data, error: dbError } = await supabase
      .from('gates_audit_responses')
      .insert({
        company_name: companyName || null,
        founder_name: founderName || null,
        email,
        revenue_range: revenueRange || null,
        entry_level_pct: pct,
        automatable_roles: names(roles, AUTOMATABLE_ROLES),
        governance_controls: names(controls, GOVERNANCE_CONTROLS),
        ld_program: LD_LABELS[ldProgram] || null,
        displacement_score: s.displacement,
        governance_score: s.governance,
        capability_score: s.capability,
        overall_score: s.overall,
        readiness_level: s.level,
        strengths: s.strengths,
        gaps: s.gaps,
        recommendations: s.recommendations,
        submitted: true,
        source: 'risk_analyzer',
      })
      .select('id')
      .single();

    if (dbError) throw dbError;

    // Internal notification only. Leads get a human follow-up within 48 hours,
    // which is the differentiator — an instant auto-report undercuts it.
    let emailStatus = 'sent';
    let emailError = null;
    try {
      await resend.emails.send({
        from: NOTIFY_FROM,
        to: NOTIFY_TO,
        replyTo: email,
        subject: `Risk Analyzer — ${companyName || email} scored ${s.overall}/100 (${s.level})`,
        html: notification({ companyName, founderName, email, revenueRange, pct, roles, controls, ldProgram }, s, data.id),
      });
    } catch (err) {
      emailStatus = 'failed';
      emailError = String(err && err.message ? err.message : err).slice(0, 500);
      console.error('Resend failed:', emailError);
    }

    await supabase
      .from('gates_audit_responses')
      .update({ email_status: emailStatus, email_error: emailError, notified_at: new Date().toISOString() })
      .eq('id', data.id);

    return res.status(200).json({ success: true, score: s.overall, level: s.level });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'We could not save your submission. Please try again.' });
  }
}

function notification(input, s, id) {
  const row = (label, value) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap">${esc(label)}</td>
      <td style="padding:6px 0;color:#111827;font-size:13px">${esc(value) || '&mdash;'}</td></tr>`;

  const list = (items) =>
    items.length
      ? items.map((i) => `<li style="margin-bottom:10px"><strong>${esc(i.title)}</strong><br><span style="color:#4b5563">${esc(i.detail)}</span></li>`).join('')
      : '<li style="color:#6b7280">None flagged.</li>';

  const recs = s.recommendations
    .map((r) => `<li style="margin-bottom:10px"><strong>${esc(r.horizon)} &middot; ${esc(r.pillar)}</strong><br>${esc(r.action)}<br><span style="color:#6b7280;font-size:13px">${esc(r.why)}</span></li>`)
    .join('');

  return `
<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px;color:#111827">
  <p style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6b7280;margin:0 0 4px">six50 &middot; AI Risk Analyzer</p>
  <h2 style="margin:0 0 4px;font-size:22px">${esc(input.companyName || 'Unnamed company')} &mdash; ${s.overall}/100</h2>
  <p style="margin:0 0 20px;color:#4b5563">
    Readiness: <strong>${esc(s.level)}</strong> &middot;
    Displacement ${s.displacement} &middot; Governance ${s.governance} &middot; Capability ${s.capability}
  </p>
  <table style="border-collapse:collapse;margin-bottom:24px">
    ${row('Contact', input.founderName)}
    ${row('Email', input.email)}
    ${row('Revenue', input.revenueRange ? '$' + input.revenueRange + 'M' : '')}
    ${row('Entry-level headcount', input.pct + '%')}
    ${row('Automatable roles', names(input.roles, AUTOMATABLE_ROLES).join(', '))}
    ${row('Governance controls', names(input.controls, GOVERNANCE_CONTROLS).join(', '))}
    ${row('L&D program', LD_LABELS[input.ldProgram] || '')}
    ${row('Submission ID', id)}
  </table>
  <h3 style="font-size:15px;margin:0 0 8px">Strengths</h3>
  <ul style="padding-left:18px;margin:0 0 20px">${list(s.strengths)}</ul>
  <h3 style="font-size:15px;margin:0 0 8px">Areas for improvement</h3>
  <ul style="padding-left:18px;margin:0 0 20px">${list(s.gaps)}</ul>
  <h3 style="font-size:15px;margin:0 0 8px">Recommended actions</h3>
  <ul style="padding-left:18px;margin:0 0 24px">${recs}</ul>
  <p style="font-size:12px;color:#9ca3af;border-top:1px solid #e5e7eb;padding-top:12px">
    Reply to this email to respond directly to ${esc(input.email)}. Target follow-up: 48 hours.
  </p>
</div>`;
}
