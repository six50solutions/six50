import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// const resend = new Resend(process.env.RESEND_API_KEY); // Moved inside handler

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is missing - skipping email send');
    return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
  }

  console.log('RESEND_API_KEY is present');

  try {
    const { name, email, message } = await request.json();

    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: 'Six50 Contact Form <contact@six50.io>',
      to: ['contact@six50.io'],
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      replyTo: email,
    });

    if (data.error) {
      console.error('Resend API Error:', data.error);
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Server Internal Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
