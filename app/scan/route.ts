// app/scan/route.ts
// Public, tokenless entry point: https://six50.io/scan
//
// Mints an invitation and redirects into the token flow, but remembers the
// token in a cookie so a refresh, a re-click, or coming back tomorrow resumes
// the same diagnostic instead of abandoning a half-finished one and starting
// over. Without this, every page load created an orphan invitation row.
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

const COOKIE = 'six50_diagnostic';
const THIRTY_DAYS = 60 * 60 * 24 * 30; // matches invitations.expires_at

export async function GET(req: NextRequest) {
  // Redirect to the host they actually arrived on (apex vs www). Hopping
  // domains here would orphan the cookie we're about to set.
  const base = req.nextUrl.origin;

  // "Start over" sends ?new=1 to force a fresh token even if one is resumable.
  const forceNew = req.nextUrl.searchParams.get('new') === '1';
  const existing = req.cookies.get(COOKIE)?.value;

  if (existing && !forceNew) {
    const { data } = await supabaseAdmin.rpc('resolve_invitation', { p_token: existing });
    const inv = data?.[0];
    // is_valid is false once submitted, expired, or revoked — in those cases
    // fall through and mint a new one rather than dead-ending the visitor.
    if (inv?.is_valid) {
      return NextResponse.redirect(new URL(`/diagnostic/${existing}`, base));
    }
  }

  const { data: version } = await supabaseAdmin
    .from('instrument_versions')
    .select('id')
    .eq('tier', 'scan')
    .eq('is_active', true)
    .single();

  if (!version) {
    return NextResponse.json({ error: 'no_active_instrument' }, { status: 500 });
  }

  const { data: created, error } = await supabaseAdmin
    .from('invitations')
    .insert({ tier: 'scan', version_id: version.id, created_by: 'public_scan_link' })
    .select('token')
    .single();

  if (error || !created) {
    return NextResponse.json({ error: 'issue_failed' }, { status: 500 });
  }

  const res = NextResponse.redirect(new URL(`/diagnostic/${created.token}`, base));
  res.cookies.set(COOKIE, created.token, {
    httpOnly: true, // nothing client-side reads this
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // survives following a link in from email
    path: '/',
    maxAge: THIRTY_DAYS,
  });
  return res;
}
