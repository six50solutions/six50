// Public, tokenless entry point: https://six50.io/scan
// Mints a fresh invitation on each visit and redirects into the same
// token-based flow everything else already uses — save/resume, scoring, and
// the review gate all come for free rather than needing a second code path.
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { data: version } = await supabaseAdmin
    .from('instrument_versions').select('id')
    .eq('tier', 'scan').eq('is_active', true).single();

  if (!version) {
    return NextResponse.json({ error: 'no_active_instrument' }, { status: 500 });
  }

  const { data: inv, error } = await supabaseAdmin
    .from('invitations')
    .insert({ tier: 'scan', version_id: version.id, created_by: 'public_scan_link' })
    .select('token').single();

  if (error || !inv) return NextResponse.json({ error: 'issue_failed' }, { status: 500 });

  return NextResponse.redirect(new URL(`/diagnostic/${inv.token}`, process.env.NEXT_PUBLIC_SITE_URL));
}
