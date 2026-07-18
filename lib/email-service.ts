import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY); // Moved inside function

export async function sendLeadNotification({
    name,
    email,
    phone,
    company,
    goal,
    source = 'chat'
}: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    goal?: string;
    source?: string;
}) {
    console.log(`Sending lead notification: ${email} from ${source}`);

    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is missing. Lead email cannot be sent.');
        throw new Error('RESEND_API_KEY is not configured');
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const { data, error } = await resend.emails.send({
            from: 'Six50 Bot <contact@six50.io>', // Using the verified domain
            to: ['contact@six50.io'],
            subject: `New Lead from ${source === 'chat' ? 'Chat' : 'Website'}: ${name}`,
            html: `
        <div style="font-family: sans-serif; color: #111;">
            <h2>New Lead Captured via ${source === 'chat' ? 'Chat Widget' : 'Contact Form'}</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Goal/Need:</strong> ${goal || 'Not provided'}</p>
            <hr />
            <p><em>Source: ${source}</em></p>
        </div>
      `,
        });

        if (error) {
            // Resend does NOT throw on API errors - it returns them here.
            console.error('Resend rejected the send:', JSON.stringify(error));
            throw new Error(`Resend error: ${error.message ?? JSON.stringify(error)}`);
        }

        console.log('Lead notification sent, id:', data?.id);
        return data;
    } catch (error) {
        console.error('Failed to send lead notification:', error);
        throw error;
    }
}
