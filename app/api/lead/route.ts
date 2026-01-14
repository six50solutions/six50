import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const email = (body.email || "").toString().trim();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
        }

        const webhook = process.env.LEAD_WEBHOOK_URL;

        if (webhook) {
            const r = await fetch(webhook, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    source: body.source || "six50_card",
                    ts: body.ts || Date.now(),
                    userAgent: req.headers.get("user-agent") || null
                })
            });

            if (!r.ok) {
                return NextResponse.json({ ok: false, error: "webhook_failed" }, { status: 502 });
            }
        } else {
            console.log("six50_lead_no_webhook", { email, ts: body.ts || Date.now() });
        }

        return NextResponse.json({ ok: true });
    } catch (e) {
        return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
    }
}
