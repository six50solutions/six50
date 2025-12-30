import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const email = (body.email || "").toString().trim();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
        }

        // Forward to webhook if configured
        const webhook = process.env.LEAD_WEBHOOK_URL;

        if (webhook) {
            try {
                const r = await fetch(webhook, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email,
                        source: body.source || "six50_card",
                        ts: body.ts || Date.now(),
                        userAgent: request.headers.get("user-agent") || null
                    })
                });

                if (!r.ok) {
                    return NextResponse.json({ ok: false, error: "webhook_failed" }, { status: 502 });
                }
            } catch (e) {
                console.error("Webhook error:", e);
                return NextResponse.json({ ok: false, error: "webhook_failed" }, { status: 502 });
            }
        } else {
            // Log locally if no webhook
            console.log("six50_lead_no_webhook", { email, ts: body.ts || Date.now() });
        }

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error("Lead API Error:", e);
        return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
    }
}
