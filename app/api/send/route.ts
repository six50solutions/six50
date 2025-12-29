import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const data = await resend.emails.send({
      from: 'Six50 Contact Form <onboarding@resend.dev>', // Using default for now, user needs to verify domain
      to: ['contact@six50.io'],
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      replyTo: email,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
