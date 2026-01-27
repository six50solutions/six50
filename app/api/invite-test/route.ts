
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
    console.log("Trace: Invite Test API Called");

    if (!process.env.RESEND_API_KEY) {
        console.error("Missing RESEND_API_KEY");
        return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const { data, error } = await resend.emails.send({
            from: 'Adil from Six50 <adil.ghazali@six50.io>',
            to: ['adilghazali@yahoo.com'],
            subject: 'Exclusive Access: Your six50 Client Portal',
            html: `
                <div style="font-family: sans-serif; color: #111; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #111;">Welcome to your Project Portal</h1>
                    <p>Hi Adil,</p>
                    <p>We've set up a secure client portal for you to track our engagement progress, access documents, and view real-time metrics.</p>
                    
                    <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin-top: 0; font-weight: bold;">Your Login Credentials:</p>
                        <p><strong>URL:</strong> <a href="http://localhost:3000/login">http://localhost:3000/login</a></p>
                        <p><strong>Email:</strong> adilghazali@yahoo.com</p>
                        <p><strong>Temporary Password:</strong> Test1234</p>
                    </div>

                    <p>Please log in and review the initial Scope of Work and Timeline.</p>
                    <p>Best,<br>The six50 Team</p>
                </div>
            `,
        });

        if (error) {
            console.error("Resend Error:", error);
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (e) {
        console.error("Exception:", e);
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}
