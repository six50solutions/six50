import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const email = (body.email || "").toString().trim();
        const name = body.name || "Unknown";
        const company = body.company || "Unknown";
        const phone = body.phone || "Not provided";

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
        }

        // Send email notification
        try {
            await resend.emails.send({
                from: 'Six50 Lead Capture <contact@six50.io>',
                to: ['contact@six50.io'],
                subject: `Playbook Request: ${name} from ${company}`,
                text: `New Playbook Request\n\nName: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nSource: ${body.source || "six50_card"}`,
                replyTo: email,
            });
        } catch (emailError) {
            console.error("Failed to send email:", emailError);
            // We continue even if email fails, to try webhook or at least return success to user
        }

        // Forward to webhook if configured (keep existing logic)
        const webhook = process.env.LEAD_WEBHOOK_URL;
        if (webhook) {
            try {
                await fetch(webhook, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email,
                        name,
                        company,
                        phone,
                        source: body.source || "six50_card",
                        ts: body.ts || Date.now(),
                        userAgent: request.headers.get("user-agent") || null
                    })
                });
            } catch (e) {
                console.error("Webhook error:", e);
                // Non-blocking
            }
        }

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error("Lead API Error:", e);
        return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
    }
}
