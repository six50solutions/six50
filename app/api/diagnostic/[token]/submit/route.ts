import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, hashIp } from '@/lib/supabase/admin';
import { score, type Answers } from '@/lib/diagnostic/scoring';
import { QUESTIONS } from '@/lib/diagnostic/instrument';
import { generateNarrativeSafe } from '@/lib/diagnostic/narrative';

export const dynamic = 'force-dynamic';

// Free-text answers worth handing the model as color, if the owner filled them in.
const FREE_TEXT_KEYS: Record<string, string> = {
  D2_Q5: 'Process that would hurt most if the owner left',
  D6_Q5: 'What breaks first if volume rose 30%',
  D10_Q5: 'What would make this a win in 12 months',
};

export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const { data: rpc } = await supabaseAdmin.rpc('resolve_invitation', { p_token: token });
  const inv = rpc?.[0];
  if (!inv?.is_valid) return NextResponse.json({ error: 'invalid' }, { status: 410 });

  // resolve_invitation returns the fields the token-check needs; org/respondent
  // links aren't part of that contract, so fetch them directly here.
  const { data: invRow } = await supabaseAdmin
    .from('invitations').select('org_id, respondent_id').eq('id', inv.invitation_id).single();

  // Score from the database, never from the request body — the client is not
  // trusted to report its own answers at submit time.
  const { data: rows } = await supabaseAdmin
    .from('responses')
    .select('question_key, value_num, value_choice, value_choices, value_text')
    .eq('invitation_id', inv.invitation_id);

  const answers: Answers = {};
  for (const r of rows ?? []) {
    const q = QUESTIONS.find((x) => x.key === r.question_key);
    answers[r.question_key] = {
      score: q?.type === 'self' ? null : r.value_num,
      self: q?.type === 'self' ? r.value_num : null,
      choice: r.value_choice,
      choices: r.value_choices,
      text: r.value_text,
    };
  }

  // Intake fields ride in the same responses table as ordinary question_keys
  // (BIZ_NAME, CONTACT_NAME, CONTACT_EMAIL, OBJECTIVE) — pull them out here,
  // once, rather than special-casing every read/write along the way.
  const byKey = (k: string) => rows?.find((r) => r.question_key === k);
  const bizName = byKey('BIZ_NAME')?.value_text ?? null;
  const contactName = byKey('CONTACT_NAME')?.value_text ?? null;
  const contactEmail = byKey('CONTACT_EMAIL')?.value_text ?? null;
  const objective = byKey('OBJECTIVE')?.value_choice ?? null;

  let orgId = invRow?.org_id ?? null;
  let respondentId = invRow?.respondent_id ?? null;
  if (bizName || contactName || contactEmail) {
    if (bizName) {
      const { data: org } = await supabaseAdmin
        .from('orgs')
        .upsert(orgId ? { id: orgId, name: bizName } : { name: bizName })
        .select('id').single();
      orgId = org?.id ?? orgId;
    }
    if (contactName || contactEmail) {
      const { data: resp } = await supabaseAdmin
        .from('respondents')
        .upsert(respondentId
          ? { id: respondentId, org_id: orgId, full_name: contactName, email: contactEmail ?? '' }
          : { org_id: orgId, full_name: contactName, email: contactEmail ?? '' })
        .select('id').single();
      respondentId = resp?.id ?? respondentId;
    }
    await supabaseAdmin.from('invitations').update({ org_id: orgId, respondent_id: respondentId }).eq('id', inv.invitation_id);
  }

  const result = score(answers, inv.tier);

  const freeText = Object.entries(FREE_TEXT_KEYS)
    .map(([key, prompt]) => ({ key, prompt, text: answers[key]?.text ?? '' }))
    .filter((f) => f.text.trim());

  const { text: narrative } = await generateNarrativeSafe({
    tier: inv.tier, orgName: bizName, objective, ols: result.ols, band: result.band,
    flags: result.flags, automation: result.automation, scaling: result.scaling,
    divergences: result.divergences, freeText,
  });

  const now = new Date().toISOString();

  const { data: submission, error } = await supabaseAdmin
    .from('submissions')
    .upsert(
      {
        invitation_id: inv.invitation_id,
        org_id: orgId,
        version_id: inv.version_id,
        ols_score: result.ols,
        band: result.band,
        domain_scores: result.domainScores,
        flags: result.flags,
        divergences: result.divergences,
        recommendations: result.plays,
        automation_opportunities: result.automation,
        scaling_opportunities: result.scaling,
        narrative,
        objective,
        review_required: result.reviewRequired,
        completed_at: now,
      },
      { onConflict: 'invitation_id' },
    )
    .select()
    .single();

  if (error) return NextResponse.json({ error: 'submit_failed' }, { status: 500 });

  await supabaseAdmin.from('invitations')
    .update({ status: 'submitted', submitted_at: now })
    .eq('id', inv.invitation_id);
  await supabaseAdmin.from('diagnostic_events').insert({
    invitation_id: inv.invitation_id,
    event: 'submitted',
    metadata: { ols: result.ols, flags: result.flags.map((f) => f.code) },
    ip_hash: hashIp(req.headers.get('x-forwarded-for')),
  });

  // Scan tier returns results immediately. Full tier confirms receipt only —
  // the report goes out after review.
  if (inv.tier === 'scan') {
    return NextResponse.json({
      ok: true,
      immediate: true,
      ols: result.ols,
      band: result.band,
      bandNote: result.bandNote,
      flags: result.flags.filter((f) => !f.internalOnly).slice(0, 3),
      divergences: result.divergences.slice(0, 1),
      automation: result.automation,
      scaling: result.scaling,
      narrative,
    });
  }

  // Hook for the AI COO pipeline: notify, draft, queue for review.
  return NextResponse.json({ ok: true, immediate: false, submissionId: submission.id });
}
