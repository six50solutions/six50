import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { createHash } from 'crypto';

// Service role key. Server-only — never import this into a client component.
// RLS denies anon entirely, so every read and write goes through here after
// the token has been validated.
//
// The client is created lazily rather than at module scope. Next.js imports
// this file while collecting page data at build time, and creating the client
// eagerly makes the *build* fail whenever the env vars aren't present.
// Deferring creation until the first actual query means the build only needs
// the code, not the secrets.

let cached: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and ' +
        'SUPABASE_SERVICE_ROLE_KEY in the environment.',
    );
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

// Proxy so every existing `supabaseAdmin.from(...)` / `.rpc(...)` call site
// keeps working unchanged — the real client is built on first property access.
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const client = getClient();
    const value = Reflect.get(client as object, prop, receiver);
    return typeof value === 'function' ? value.bind(client) : value;
  },
});

export function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  const salt = process.env.DIAGNOSTIC_IP_SALT ?? '';
  return createHash('sha256').update(ip + salt).digest('hex').slice(0, 32);
}
