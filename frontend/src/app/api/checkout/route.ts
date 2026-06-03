import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

let stripeClient: Stripe | null = null;
function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY not configured');
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

// Lookup-key allowlist. Each key MUST be set on the matching Price object in
// BOTH the sandbox and live Stripe accounts. At request time we resolve the
// current price ID for whichever account the server's STRIPE_SECRET_KEY
// points at, so the same lookup key works in test and live without code or
// CMS changes.
const ALLOWED_LOOKUP_KEYS = new Set<string>([
  // New Patient, In-Clinic
  'initial-consultation',
  // Returning Patient, In-Clinic
  'appointment-deposit',
  'infusion-60min-1to4',
  'booster-60min',
  'infusion-90min',
  'infusion-2hr',
  'infusion-3hr',
  'infusion-4hr',
  'membership-6',
  'membership-12',
  // At-Home Ketamine
  'athome-consult-1',
  'athome-consult-2',
  'athome-consult-3',
  'athome-followup',
  'athome-rx-change',
]);

export async function POST(req: NextRequest) {
  let lookupKey: string;

  try {
    const body = await req.json();
    lookupKey = body.lookupKey;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!lookupKey || !ALLOWED_LOOKUP_KEYS.has(lookupKey)) {
    return NextResponse.json({ error: 'Invalid lookup key' }, { status: 400 });
  }

  const origin = req.headers.get('origin') ?? 'https://phos.la';

  try {
    const stripe = getStripe();

    const prices = await stripe.prices.list({
      lookup_keys: [lookupKey],
      active: true,
      limit: 1,
    });
    const price = prices.data[0];
    if (!price) {
      return NextResponse.json(
        { error: `No active price found for lookup key "${lookupKey}"` },
        { status: 404 },
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: price.id, quantity: 1 }],
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
