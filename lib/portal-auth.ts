// Signed, expiring session cookie for the client portal.
// Uses Web Crypto so it runs in both the middleware and Node route handlers.
//
// Required environment variables (set in Vercel → Project → Settings → Environment Variables):
//   PORTAL_EMAIL         the portal sign-in email
//   PORTAL_PASSWORD      the portal password (never commit it)
//   PORTAL_AUTH_SECRET   a long random string used to sign sessions
// If any are missing, sign-in is refused (fails closed).

export const PORTAL_COOKIE = "six50_auth";
export const SESSION_SECONDS = 60 * 60 * 24 * 7; // 7 days

const enc = new TextEncoder();

function toHex(buf: ArrayBuffer): string {
    return Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

async function hmac(secret: string, data: string): Promise<string> {
    const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    return toHex(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}

/** Compare two strings without leaking where they differ. */
async function safeEqual(a: string, b: string, secret: string): Promise<boolean> {
    const [x, y] = await Promise.all([hmac(secret, "cmp:" + a), hmac(secret, "cmp:" + b)]);
    let diff = 0;
    for (let i = 0; i < x.length; i++) diff |= x.charCodeAt(i) ^ y.charCodeAt(i);
    return diff === 0;
}

export function portalConfigured(): boolean {
    return Boolean(process.env.PORTAL_EMAIL && process.env.PORTAL_PASSWORD && process.env.PORTAL_AUTH_SECRET);
}

export async function checkCredentials(email: string, password: string): Promise<boolean> {
    const secret = process.env.PORTAL_AUTH_SECRET;
    if (!portalConfigured() || !secret) return false;
    const emailOk = await safeEqual(email.trim().toLowerCase(), process.env.PORTAL_EMAIL!.trim().toLowerCase(), secret);
    const passOk = await safeEqual(password, process.env.PORTAL_PASSWORD!, secret);
    return emailOk && passOk;
}

export async function createSession(): Promise<string> {
    const secret = process.env.PORTAL_AUTH_SECRET!;
    const exp = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
    return `${exp}.${await hmac(secret, `portal:${exp}`)}`;
}

export async function verifySession(value: string | undefined): Promise<boolean> {
    const secret = process.env.PORTAL_AUTH_SECRET;
    if (!secret || !value) return false;
    const [expStr, sig] = value.split(".");
    const exp = Number(expStr);
    if (!Number.isFinite(exp) || !sig || exp < Math.floor(Date.now() / 1000)) return false;
    return safeEqual(sig, await hmac(secret, `portal:${exp}`), secret);
}
