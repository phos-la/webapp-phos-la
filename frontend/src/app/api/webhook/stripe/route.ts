import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getResend, CLINIC_INBOX, FROM_ADDRESS } from '@/lib/email';

// Stripe webhook: notifies the clinic inbox when a patient completes a
// checkout, with a breakdown of what they paid for. This is the clinic-facing
// counterpart to /book/thanks/success (which is what the patient sees).
//
// Setup: add an endpoint in the Stripe dashboard pointing at
// /api/webhook/stripe for the `checkout.session.completed` event, then put the
// signing secret in STRIPE_WEBHOOK_SECRET. The handler verifies the signature
// against the raw request body, so it must read req.text() (not req.json()).

let stripeClient: Stripe | null = null;
function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY not configured');
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

function formatAmount(amount: number | null, currency: string | null): string {
  if (amount === null) return 'unknown amount';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: (currency || 'usd').toUpperCase(),
  }).format(amount / 100);
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  const rawBody = await req.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid signature';
    return NextResponse.json({ error: `Webhook signature failed: ${message}` }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    // Acknowledge other event types so Stripe stops retrying them.
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  try {
    // The session on the event doesn't include line items; fetch them.
    const full = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items'],
    });

    const lineItems = full.line_items?.data ?? [];
    const itemsText = lineItems.length
      ? lineItems
          .map(
            (li) =>
              `- ${li.description ?? 'Item'} x${li.quantity ?? 1} (${formatAmount(
                li.amount_total,
                full.currency,
              )})`,
          )
          .join('\n')
      : '- (line items unavailable)';

    const customerName = full.customer_details?.name ?? '(name not provided)';
    const customerEmail = full.customer_details?.email ?? '(email not provided)';
    const customerPhone = full.customer_details?.phone ?? '(phone not provided)';
    const total = formatAmount(full.amount_total, full.currency);

    const resend = getResend();
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: CLINIC_INBOX,
      subject: `Payment received: ${total} from ${customerName}`,
      text: [
        'A patient just completed a payment on the website.',
        '',
        `Name: ${customerName}`,
        `Email: ${customerEmail}`,
        `Phone: ${customerPhone}`,
        '',
        'Paid for:',
        itemsText,
        '',
        `Total: ${total}`,
        `Stripe session: ${full.id}`,
      ].join('\n'),
    });

    return NextResponse.json({ received: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Processing error';
    // Return 500 so Stripe retries; the payment itself already succeeded.
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
