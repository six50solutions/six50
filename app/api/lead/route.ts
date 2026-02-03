import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log('Lead API received body:', body);
        const email = (body.email || "").toString().trim();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
        }

        const webhook = process.env.LEAD_WEBHOOK_URL;
        let webhookSuccess = false;

        // 1. Try forwarding to webhook (if configured) because we might want it in Zapier/etc too
        if (webhook) {
            try {
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
                if (r.ok) webhookSuccess = true;
            } catch (e) {
                console.error("Webhook failed", e);
            }
        }

        // 2. Handle Email Sending based on Source
        if (process.env.RESEND_API_KEY) {
            const resend = new Resend(process.env.RESEND_API_KEY);
            try {
                if (body.source === 'chat') {
                    // Send New Lead Notification to Admin
                    const emailResult = await resend.emails.send({
                        from: 'Six50 Bot <no-reply@six50.io>',
                        to: ['contact@six50.io'],
                        subject: `New Lead from Chat: ${body.name}`,
                        html: `
                            <div style="font-family: sans-serif; color: #111;">
                                <h2>New Chat Lead Captured</h2>
                                <p><strong>Name:</strong> ${body.name}</p>
                                <p><strong>Contact Details:</strong> ${email} ${body.phone ? `| ${body.phone}` : ''}</p>
                                <p><strong>Details on the need:</strong> ${body.goal || 'N/A'}</p>
                                <p><strong>Company:</strong> ${body.company || 'N/A'}</p>
                                <hr />
                                <p><em>Source: Chat Widget</em></p>
                            </div>
                        `,
                    });
                    console.log('Chat lead email sent:', emailResult);
                } else {
                    // Default: Send Playbook to User (original logic)
                    const emailResult = await resend.emails.send({
                        from: 'Adil from Six50 <adil.ghazali@six50.io>',
                        to: [email],
                        bcc: ['contact@six50.io'], // Admin notification
                        subject: 'The six50 Playbook (AI Transformation Checklist)',
                        html: `
                            <div style="font-family: sans-serif; color: #111;">
                                <p>Hi there,</p>
                                <p>Thanks for requesting the six50 AI Transformation Playbook. It's designed to help you cut through the noise and focus on what actually drives value.</p>
                                <h3>The Checklist:</h3>
                                <ol>
                                    <li><strong>Define the Problem, Not the Tech:</strong> Don't start with "We need AI." Start with "We need to solve X inefficiency."</li>
                                    <li><strong>Audit Your Data:</strong> AI is only as good as the data you feed it. Is yours accessible and clean?</li>
                                    <li><strong>Start Small, Scale Fast:</strong> Pick one high-impact, low-risk use case (e.g., internal knowledge search) to prove value.</li>
                                    <li><strong>Human-in-the-Loop:</strong> AI should augment your team, not replace them blindly. Design workflows where humans review AI output.</li>
                                    <li><strong>Measure Impact:</strong> Define KPIs before you launch (e.g., hours saved, response time reduced).</li>
                                </ol>
                                <p>If you have specific questions about applying this to your organization, feel free to reply directly to this email.</p>
                                <p>Best,<br/>Adil Ghazali<br/>six50.io</p>
                            </div>
                        `,
                    });
                    console.log('Playbook email result:', emailResult);
                }
            } catch (emailError) {
                console.error("Email sending failed", emailError);
                if (!webhook && !webhookSuccess) {
                    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
                }
            }
        } else {
            console.log("RESEND_API_KEY missing, skipping email send");
            if (!webhook) {
                console.log("six50_lead_no_action", { email });
            }
        }

        return NextResponse.json({ ok: true });
    } catch (e) {
        return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
    }
}
