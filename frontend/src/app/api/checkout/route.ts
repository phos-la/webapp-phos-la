import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Allowlist of sandbox price IDs — prevents arbitrary price ID injection.
// Update this map when connecting the live Stripe account.
// All current prices are one-time payments.
const ALLOWED_PRICES: Record<string, string> = {
  // New Patient — In-Clinic
  price_1TUZfLAEmpFZtKZrBUkSXcKA: 'Initial Consultation',

  // Returning Patient — In-Clinic
  price_1TUZfMAEmpFZtKZrHVF413eb: 'Appointment Deposit',
  price_1TUZfMAEmpFZtKZrWTmNc1sn: '60 Min Infusion (sessions 1–4)',
  price_1TUZfMAEmpFZtKZrYyEIRKJI: '60 Min Booster Infusion',
  price_1TUZfNAEmpFZtKZroakOPLD9: '90 Min Ketamine Infusion',
  price_1TUZfNAEmpFZtKZrYVpP4FPr: '2-Hour Pain or Mood Infusion',
  price_1TUZfOAEmpFZtKZrMTAhDFkT: '3-Hour Pain or Mood Infusion',
  price_1TUZfOAEmpFZtKZrgVEs62v9: '4-Hour Pain or Mood Infusion',
  price_1TUZfPAEmpFZtKZrQUvOlB2u: '6-Infusion Membership',
  price_1TUZfPAEmpFZtKZrZ76d0VgA: '12-Infusion Membership',

  // At-Home Ketamine
  price_1TUZfPAEmpFZtKZr9c3BFhxk: '1st Video Consultation',
  price_1TUZfQAEmpFZtKZrHz035xcy: '2nd Video Consultation',
  price_1TUZfQAEmpFZtKZr7U2B0sfN: '3rd Video Consultation',
  price_1TUZfRAEmpFZtKZrDSBgMRqO: 'Follow-up Video Visit',
  price_1TUZfRAEmpFZtKZrKPXRcig0: 'Prescription Changes',
};

export async function POST(req: NextRequest) {
  let priceId: string;

  try {
    const body = await req.json();
    priceId = body.priceId;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!priceId || !(priceId in ALLOWED_PRICES)) {
    return NextResponse.json({ error: 'Invalid price ID' }, { status: 400 });
  }

  const origin = req.headers.get('origin') ?? 'https://phos.la';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/book/thanks/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/book/thanks`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
