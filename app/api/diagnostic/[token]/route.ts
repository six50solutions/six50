import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, hashIp } from '@/lib/supabase/admin';
import { questionsFor, type Tier } from '@/lib/diagnostic/instrument';

export const dynamic = 'force-dynamic';

async function resolve(token: string) {
  const { data, error } = await supabaseAdmin.rpc('resolve_invitation', { p_token: token });
  if (error || !data?.length) return null;
  return data[0] as {
    invitation_id: string; org_name: string | null; tier: Tier; version_id: string; status: string; is_valid: boolean;
  };
}

// GET — resolve the link and hand back saved answers for resume
export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const inv = await resolve(token);
  if (!inv) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  if (!inv.is_valid) return NextResponse.json({ error: 'expired', status: inv.status }, { status: 410 });

  const { data: saved } = await supabaseAdmin
    .from('responses')
    .select('question_key, value_num, value_choice, value_choices, value_text')
    .eq('invitation_id', inv.invitation_id);

  if (inv.status === 'issued') {
    await supabaseAdmin.from('invitations')
      .update({ status: 'opened', opened_at: new Date().toISOString() })
      .eq('id', inv.invitation_id);
    await supabaseAdmin.from('diagnostic_events').insert({
      invitation_id: inv.invitation_id,
      event: 'opened',
      ip_hash: hashIp(req.headers.get('x-forwarded-for')),
    });
  }

  return NextResponse.json({
    orgName: inv.org_name,
    tier: inv.tier,
    questions: questionsFor(inv.tier),
    answers: saved ?? [],
  });
}

// PATCH — autosave a single answer. Upsert keeps resume cheap and idempotent.
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const inv = await resolve(token);
  if (!inv?.is_valid) return NextResponse.json({ error: 'invalid' }, { status: 410 });

  const body = await req.json();
  const { questionKey, domain, valueNum, valueChoice, valueChoices, valueText } = body;
  if (typeof questionKey !== 'string') return NextResponse.json({ error: 'bad_request' }, { status: 400 });

  const { error } = await supabaseAdmin.from('responses').upsert(
    {
      invitation_id: inv.invitation_id,
      question_key: questionKey,
      domain: domain ?? null,
      value_num: valueNum ?? null,
      value_choice: valueChoice ?? null,
      value_choices: valueChoices ?? null,
      value_text: valueText ?? null,
      answered_at: new Date().toISOString(),
    },
    { onConflict: 'invitation_id,question_key' },
  );
  if (error) return NextResponse.json({ error: 'save_failed' }, { status: 500 });

  if (inv.status !== 'in_progress') {
    await supabaseAdmin.from('invitations').update({ status: 'in_progress' }).eq('id', inv.invitation_id);
  }
  return NextResponse.json({ ok: true, savedAt: new Date().toISOString() });
}
