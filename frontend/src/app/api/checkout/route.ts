import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Lazy-init: instantiating Stripe at module load fails during `next build`
// when STRIPE_SECRET_KEY isn't present in the build environment.
let stripeClient: Stripe | null = null;
function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY not configured');
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

// Allowlist of live Stripe price IDs — prevents arbitrary price ID injection.
// All current prices are one-time payments.
const ALLOWED_PRICES: Record<string, string> = {
  // New Patient — In-Clinic
  price_1TeEnuPOpLzZeFDt4dQkyPze: 'Initial Consultation',

  // Returning Patient — In-Clinic
  price_1TeEnuPOpLzZeFDtjAIaJOP7: 'Appointment Deposit',
  price_1TeEnuPOpLzZeFDtwb3SbN3l: '60 Min Infusion (sessions 1–4)',
  price_1TeEntPOpLzZeFDtuNsh7kyN: '60 Min Booster Infusion',
  price_1TeEntPOpLzZeFDtwQjcoMlB: '90 Min Ketamine Infusion',
  price_1TeEntPOpLzZeFDtVcNV5KMk: '2-Hour Pain or Mood Infusion',
  price_1TeEntPOpLzZeFDtfhuLJb6N: '3-Hour Pain or Mood Infusion',
  price_1TeEnsPOpLzZeFDtO0EFJMwB: '4-Hour Pain or Mood Infusion',
  price_1TeEnsPOpLzZeFDtKvaItAwa: '6-Infusion Membership',
  price_1TeEnsPOpLzZeFDtwoMf2nnh: '12-Infusion Membership',

  // At-Home Ketamine
  price_1TeEnrPOpLzZeFDtvgNzqpkh: '1st Video Consultation',
  price_1TeEnrPOpLzZeFDtn1FKkd00: '2nd Video Consultation',
  price_1TeEnrPOpLzZeFDt3UJUvuOW: '3rd Video Consultation',
  price_1TeEnrPOpLzZeFDtqebCyLiG: 'Follow-up Video Visit',
  price_1TeEnqPOpLzZeFDtCRgaM6Fx: 'Prescription Changes',
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
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${origin}/book/thanks/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/book/thanks`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
