// lib/diagnostic/notify.ts
//
// Sends a submission notification. Two shapes, deliberately different:
//
//   full  — a paid intake landed and needs review before the write-up goes
//           out. Contains everything needed to review from the inbox.
//   scan  — a free scan completed. This is a lead, not a task; shorter,
//           lower urgency. Set DIAGNOSTIC_NOTIFY_SCAN=false to mute these
//           once volume makes per-lead email noisy.
//
// Uses Resend, which is already in the project. Client is created lazily for
// the same reason as the Supabase one: importing this file during a build
// shouldn't require the API key to exist.

import { Resend } from 'resend';
import type { Divergence, Flag, Opportunity, Play } from './scoring';
import type { Tier } from './instrument';

let cached: Resend | null = null;

function getResend(): Resend {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set.');
  cached = new Resend(key);
  return cached;
}

export type NotifyInput = {
  tier: Tier;
  submissionId: string;
  invitationId: string;
  businessName: string | null;
  contactName: string | null;
  contactEmail: string | null;
  objective: string | null;
  ols: number;
  band: string;
  flags: Flag[];
  divergences: Divergence[];
  automation: Play[];
  scaling: Opportunity[];
  narrative: string | null;
  freeText: { key: string; prompt: string; text: string }[];
};

const SEVERITY_ORDER = { critical: 0, high: 1, medium: 2 } as const;
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function subjectFor(i: NotifyInput): string {
  const who = i.businessName?.trim() || 'Unknown business';
  if (i.tier === 'full') {
    const critical = i.flags.filter((f) => f.severity === 'critical').length;
    const prefix = critical > 0 ? `[REVIEW · ${critical} critical]` : '[REVIEW]';
    return `${prefix} ${who} — ${i.ols} ${i.band}`;
  }
  return `New scan: ${who} — ${i.ols} ${i.band}`;
}

function buildHtml(i: NotifyInput): string {
  const rows = (pairs: [string, string | null][]) =>
    pairs
      .filter(([, v]) => v?.trim())
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 16px 4px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${esc(k)}</td>` +
          `<td style="padding:4px 0;color:#111827">${esc(v!)}</td></tr>`,
      )
      .join('');

  const flagsSorted = [...i.flags].sort(
    (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity],
  );

  const flagHtml = flagsSorted
    .map((f) => {
      const color =
        f.severity === 'critical' ? '#b91c1c' : f.severity === 'high' ? '#b45309' : '#6b7280';
      // internalOnly flags never reach the client's report — but they're the
      // ones that most change how the engagement should be shaped, so they're
      // called out here rather than hidden.
      const tag = f.internalOnly
        ? ' <span style="background:#eef2ff;color:#3730a3;padding:1px 6px;border-radius:3px;font-size:11px">INTERNAL</span>'
        : '';
      return (
        `<li style="margin-bottom:10px">` +
        `<strong style="color:${color};text-transform:uppercase;font-size:11px;letter-spacing:.06em">${f.severity}</strong>${tag}<br>` +
        `<span style="color:#111827">${esc(f.finding)}</span>` +
        `</li>`
      );
    })
    .join('');

  const divergenceHtml = i.divergences.length
    ? `<p style="margin:0 0 8px"><strong>Blind spots</strong></p><ul style="margin:0 0 20px;padding-left:18px;color:#111827">` +
      i.divergences
        .map(
          (d) =>
            `<li>${esc(d.code)}: self-rated ${d.selfRating}/5 vs measured ${Math.round(
              d.measured * 100,
            )}%${d.inverse ? ' (underselling a strength)' : ''}</li>`,
        )
        .join('') +
      `</ul>`
    : '';

  const freeTextHtml = i.freeText.length
    ? `<p style="margin:0 0 8px"><strong>In their words</strong></p>` +
      i.freeText
        .map(
          (f) =>
            `<p style="margin:0 0 12px"><span style="color:#6b7280;font-size:13px">${esc(
              f.prompt,
            )}</span><br><span style="color:#111827">${esc(f.text)}</span></p>`,
        )
        .join('')
    : '';

  const narrativeHtml = i.narrative
    ? `<p style="margin:0 0 8px"><strong>Draft recommendation</strong> <span style="color:#6b7280;font-size:12px">(generated — edit before sending)</span></p>` +
      `<div style="background:#f9fafb;border-left:3px solid #d4b45f;padding:12px 16px;margin-bottom:20px;color:#111827;white-space:pre-wrap">${esc(
        i.narrative,
      )}</div>`
    : `<p style="color:#b91c1c;margin:0 0 20px">Narrative generation failed — write this section manually.</p>`;

  const opportunityList = (title: string, items: string[]) =>
    items.length
      ? `<p style="margin:0 0 8px"><strong>${title}</strong></p><ul style="margin:0 0 20px;padding-left:18px;color:#111827">` +
        items.map((t) => `<li style="margin-bottom:4px">${esc(t)}</li>`).join('') +
        `</ul>`
      : '';

  const action =
    i.tier === 'full'
      ? `<p style="margin:0 0 20px;padding:12px 16px;background:#fffbeb;border:1px solid #fcd34d;color:#78350f">
           <strong>Action needed:</strong> review and send the write-up. Target is two business days.
         </p>`
      : `<p style="margin:0 0 20px;color:#6b7280">Free scan — results already shown to them on screen. Follow up if it looks worth a conversation.</p>`;

  return `<!DOCTYPE html><html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;font-size:15px;line-height:1.55">
<div style="max-width:640px;margin:0 auto;background:#ffffff;padding:28px 32px;border:1px solid #e5e7eb">

  <p style="margin:0 0 4px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#6b7280">
    ${i.tier === 'full' ? 'Diagnostic intake' : 'Blind spot scan'}
  </p>
  <h1 style="margin:0 0 4px;font-size:22px;color:#111827">${esc(i.businessName?.trim() || 'Unknown business')}</h1>
  <p style="margin:0 0 20px;font-size:32px;font-weight:600;color:#111827">
    ${i.ols} <span style="font-size:16px;font-weight:500;color:#6b7280">${esc(i.band)}</span>
  </p>

  ${action}

  <table style="border-collapse:collapse;margin-bottom:20px;font-size:14px">
    ${rows([
      ['Contact', i.contactName],
      ['Email', i.contactEmail],
      ['Their goal', i.objective],
    ])}
  </table>

  ${flagHtml ? `<p style="margin:0 0 8px"><strong>Findings</strong></p><ul style="margin:0 0 20px;padding-left:18px">${flagHtml}</ul>` : ''}
  ${divergenceHtml}
  ${opportunityList('Automation opportunities', i.automation.map((a) => `${a.name} — ${a.automation ?? a.first90}`))}
  ${opportunityList('Scaling opportunities', i.scaling.map((s) => s.finding))}
  ${freeTextHtml}
  ${narrativeHtml}

  <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280">
    Submission <code>${esc(i.submissionId)}</code>
  </p>
</div></body></html>`;
}

function buildText(i: NotifyInput): string {
  const lines = [
    `${i.tier === 'full' ? 'DIAGNOSTIC INTAKE' : 'BLIND SPOT SCAN'}`,
    `${i.businessName?.trim() || 'Unknown business'} — ${i.ols} (${i.band})`,
    '',
    `Contact:    ${i.contactName ?? '—'}`,
    `Email:      ${i.contactEmail ?? '—'}`,
    `Their goal: ${i.objective ?? '—'}`,
    '',
    'FINDINGS',
    ...i.flags.map((f) => `  [${f.severity.toUpperCase()}]${f.internalOnly ? ' (internal)' : ''} ${f.finding}`),
  ];
  if (i.freeText.length) {
    lines.push('', 'IN THEIR WORDS');
    for (const f of i.freeText) lines.push(`  ${f.prompt}`, `    ${f.text}`);
  }
  if (i.narrative) lines.push('', 'DRAFT RECOMMENDATION', i.narrative);
  lines.push('', `Submission ${i.submissionId}`);
  return lines.join('\n');
}

export async function sendSubmissionNotification(
  input: NotifyInput,
): Promise<{ sent: boolean; skipped?: string; error?: string }> {
  try {
    if (input.tier === 'scan' && process.env.DIAGNOSTIC_NOTIFY_SCAN === 'false') {
      return { sent: false, skipped: 'scan notifications disabled' };
    }

    const to = process.env.DIAGNOSTIC_NOTIFY_TO;
    const from = process.env.DIAGNOSTIC_NOTIFY_FROM ?? 'six50 diagnostic <onboarding@resend.dev>';
    if (!to) return { sent: false, skipped: 'DIAGNOSTIC_NOTIFY_TO not set' };

    const { data, error: sendError } = await getResend().emails.send({
      from,
      to: to.split(',').map((s) => s.trim()).filter(Boolean),
      subject: subjectFor(input),
      html: buildHtml(input),
      text: buildText(input),
      ...(input.contactEmail ? { replyTo: input.contactEmail } : {}),
    });

    // Resend's SDK does NOT throw for API-level rejections (invalid/
    // unverified domain, sandbox restrictions, etc.) — it returns an `error`
    // field instead. Discarding the response here was the actual bug: every
    // send looked like a success even when Resend rejected it outright.
    if (sendError) {
      console.error('[diagnostic] Resend rejected the send:', sendError);
      return { sent: false, error: `${sendError.name}: ${sendError.message}` };
    }

    console.log('[diagnostic] notification sent, Resend id:', data?.id);
    return { sent: true };
  } catch (err) {
    // Never let a notification failure surface to the person submitting —
    // their answers are already safely stored.
    console.error('[diagnostic] notification failed', err);
    return { sent: false, error: err instanceof Error ? err.message : 'unknown' };
  }
}
