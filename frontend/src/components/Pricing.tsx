export interface PricingTier {
  _id?: string;
  name: string;
  description: string;
  price: string;
  unit?: string;
  featured?: boolean;
  features: string[];
}

export interface PricingCalloutData {
  label?: string;
  heading?: string;
  subheading?: string;
  calloutText?: string;
  calloutPhone?: string;
}

export interface PricingData {
  callout?: PricingCalloutData;
  tiers?: PricingTier[];
}

const LeafIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    style={{ flexShrink: 0, width: 14, height: 14, marginTop: 3, color: 'var(--cream-400)' }}
  >
    <path
      d="M12 21 C 7 18, 6 12, 11 4 C 16 8, 17 15, 12 21 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DEFAULT_TIERS: PricingTier[] = [
  {
    name: 'Single Infusion',
    description: 'One standalone IV ketamine session with full clinical support',
    price: '$650',
    featured: false,
    features: [
      'Pre-infusion PA consultation',
      'IV ketamine administration',
      'Supportive therapies as needed',
      'Post-infusion PA check-in',
    ],
  },
  {
    name: 'Membership Rate',
    description: 'Lowest published IV ketamine rate in Los Angeles, based on our patient outcomes.',
    price: '$400',
    unit: '/session',
    featured: true,
    features: [
      'Everything in single infusion',
      'Protocol adjustments every visit',
      'NAD+, magnesium, Zofran as needed',
      'Integration follow-up',
    ],
  },
  {
    name: 'At-Home Program',
    description:
      'Telehealth-based ketamine therapy for eligible existing patients, managed by your PA.',
    price: 'Starting at $65',
    unit: '/mo',
    featured: false,
    features: [
      'Initial video evaluation',
      'Prescription up to 3 months',
      '3-refill self-evaluation check-in',
      '6-month re-evaluation visit',
    ],
  },
];

const DEFAULT_CALLOUT: PricingCalloutData = {
  label: 'Pricing',
  heading: 'Transparent pricing',
  subheading:
    'Every session includes PA consultation before and after, plus any supportive therapies adjusted to your protocol. No surprise line items.',
  calloutText:
    'Not sure where to start? A free 15-minute call with our team will walk you through candidacy, options, and what to expect before you commit to anything.',
  calloutPhone: '(424) 278-4241',
};

export default function Pricing({ data }: { data?: PricingData }) {
  const tiers = data?.tiers?.length ? data.tiers : DEFAULT_TIERS;
  const callout = { ...DEFAULT_CALLOUT, ...data?.callout };

  return (
    <section className="section" data-screen-label="09 Pricing" id="pricing">
      <div className="section-inner">
        <div className="section-head">
          <span className="label-pill">{callout.label}</span>
          <h2 className="section-title">{callout.heading}</h2>
          <p className="section-sub">{callout.subheading}</p>
        </div>

        <div className="pricing-grid">
          {tiers.map((tier) => (
            <article
              key={tier._id ?? tier.name}
              className={`price-card${tier.featured ? ' is-featured' : ''}`}
            >
              {tier.featured && (
                <svg
                  className="price-card-leaves"
                  viewBox="0 0 110 50"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M55 42 C 55 28, 60 18, 70 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M70 14 C 76 8, 88 6, 96 8 C 92 18, 80 22, 70 18"
                    fill="#9ab27a"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <path
                    d="M55 42 C 55 30, 50 22, 38 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M38 18 C 30 14, 18 14, 12 18 C 18 26, 32 28, 40 22"
                    fill="#9ab27a"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <path
                    d="M55 42 C 56 32, 60 26, 66 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M66 24 C 72 22, 80 24, 84 28 C 78 32, 70 32, 64 28"
                    fill="#a8c089"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <path
                    d="M55 42 C 54 32, 50 28, 44 26"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M44 26 C 38 24, 30 26, 26 30 C 32 34, 40 34, 46 30"
                    fill="#a8c089"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              )}
              {tier.featured && <span className="price-badge">Best value</span>}
              <h3 className="price-name">{tier.name}</h3>
              <p className="price-desc">{tier.description}</p>
              <div className="price-included">
                <p className="price-included-label">What&apos;s included:</p>
                <ul>
                  {(tier.features ?? []).map((f) => (
                    <li key={f}>
                      <LeafIcon />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="price-foot">
                <p className="price-amount">
                  {tier.price}
                  {tier.unit && <span className="price-unit">{tier.unit}</span>}
                </p>
                <a className={`price-cta${tier.featured ? ' is-featured' : ''}`} href="/book">
                  Book a consultation
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="price-callout">
          <div className="price-callout-text">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 5 C 5 4, 6 3, 7 3 L 9 3 C 10 3, 11 4, 11 5 L 11 8 C 11 9, 10 10, 9 10 L 8 10 C 9 14, 12 17, 16 18 L 16 17 C 16 16, 17 15, 18 15 L 21 15 C 22 15, 23 16, 23 17 L 23 19 C 23 20, 22 21, 21 21 C 12 21, 5 14, 5 5 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{callout.calloutText}</span>
          </div>
          <a className="price-callout-cta" href={`tel:${callout.calloutPhone?.replace(/\D/g, '')}`}>
            {callout.calloutPhone}
          </a>
        </div>
      </div>
    </section>
  );
}
