import { NextRequest, NextResponse } from 'next/server';
import { getResend, CLINIC_INBOX, FROM_ADDRESS } from '@/lib/email';

// Public contact form handler. Routes general inquiries to the clinic inbox.
// HIPAA note: this is an inquiry-routing endpoint, not a patient intake form.
// Nothing is stored server-side, and the form copy asks visitors not to share
// medical details. Treat every field as untrusted, low-trust contact info.

const MAX = { name: 120, email: 200, phone: 40, message: 4000 } as const;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Bots usually do.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (
    name.length > MAX.name ||
    email.length > MAX.email ||
    phone.length > MAX.phone ||
    message.length > MAX.message
  ) {
    return NextResponse.json({ error: 'One or more fields are too long.' }, { status: 400 });
  }

  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: CLINIC_INBOX,
      replyTo: email,
      subject: `New website inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : 'Phone: (not provided)',
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <h2 style="font-family:sans-serif">New website inquiry</h2>
        <p style="font-family:sans-serif"><strong>Name:</strong> ${escapeHtml(name)}<br/>
        <strong>Email:</strong> ${escapeHtml(email)}<br/>
        <strong>Phone:</strong> ${phone ? escapeHtml(phone) : '(not provided)'}</p>
        <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: 'Could not send your message.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Could not send your message.' }, { status: 500 });
  }
}
