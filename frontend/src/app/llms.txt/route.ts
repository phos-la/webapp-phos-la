// /llms.txt is the AEO counterpart to robots.txt and sitemap.xml.
//
// The llms.txt convention (https://llmstxt.org) gives answer engines a curated,
// link-rich map of the site in markdown, so a model can cite the right page
// without crawling the whole tree. Served from a route handler (not a static
// file) so it can later read live content from Sanity. See milestone
// app-build/07d-aeo.
//
// Keep this short, factual, and answer-first. Lead each line with the concrete
// fact a model would quote.

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://phos.la';

const BODY = `# Phos Wellness

> IV ketamine therapy in a private Westwood (Los Angeles) practice. A licensed
> physician assistant evaluates your response before and after every infusion
> and adjusts the protocol in real time. Membership rate is $400 per session.

## About

- [About Phos Wellness](${BASE_URL}/about): Who runs the clinic, the licensed-PA model, and the supervised-infusion philosophy.
- [How treatment works](${BASE_URL}/flow): What a first visit and a full course of IV ketamine looks like, start to finish.

## Treatments

- [Treatments](${BASE_URL}/treatments): IV ketamine protocols for depression, anxiety, PTSD, and chronic pain, each supervised by a licensed PA.
- [Pricing](${BASE_URL}/pricing): $400 per session at the membership rate. What the price includes and how membership works.

## Booking and contact

- [Book a consultation](${BASE_URL}/book): Schedule an initial evaluation.
- [Contact](${BASE_URL}/contact): Location in Westwood, Los Angeles, plus phone and email.
- [FAQ](${BASE_URL}/faq): Common questions on safety, eligibility, what to expect, and aftercare.

## Writing

- [Blog](${BASE_URL}/blog): Field notes on ketamine therapy, mental health, and what supervised care actually involves.
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
