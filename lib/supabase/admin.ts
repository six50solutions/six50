import { createClient } from '@supabase/supabase-js';

// Service role key. Server-only — never import this into a client component.
// RLS denies anon entirely, so every read and write goes through here after
// the token has been validated.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

export function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  const { createHash } = require('crypto');
  return createHash('sha256').update(ip + process.env.DIAGNOSTIC_IP_SALT!).digest('hex').slice(0, 32);
}
