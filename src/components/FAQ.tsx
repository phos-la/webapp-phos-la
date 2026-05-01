"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What should I bring?",
    a: "Just come as you are. We recommend wearing comfortable, weather-appropriate clothes, bringing a water bottle, and perhaps a small journal. Everything else — tea, blankets, materials — is provided.",
  },
  {
    q: "Do I need experience with therapy or meditation?",
    a: "No prior experience is needed. Sessions are designed for anyone who wants to slow down, regardless of background. We meet you exactly where you are.",
  },
  {
    q: "What happens if the weather is bad?",
    a: "Light rain is part of the experience — we have shelters and warm layers. For heavy weather we move work indoors to the cabin, or reschedule at no cost.",
  },
  {
    q: "Is this therapy?",
    a: "It's not clinical psychotherapy. It's somatic, nature-based work designed to support rest, integration, and reconnection. If you're in active treatment, we're happy to coordinate with your therapist.",
  },
  {
    q: "Can I come with a friend or partner?",
    a: "Yes — paired and small-group sessions are available. Just mention it when booking and we'll tailor the rhythm so both people feel held.",
  },
  {
    q: "How do I know which session is right for me?",
    a: "Start with a free 15-minute call. We'll talk through what you're looking for and pick the format — core, overnight, or deep retreat — that meets you best.",
  },
];

const FaqIcon = () => (
  <svg
    className="faq-icon"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M4 20 C 4 11, 11 4, 20 4 C 20 13, 13 20, 4 20 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M4 20 L 17 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="section faq-section" data-screen-label="11 FAQ">
      <div className="section-inner">
        <div className="section-head">
          <span className="label-pill">FAQ</span>
          <h2 className="section-title">Questions You Might Have</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className={`faq-row${openIndex === i ? " is-open" : ""}`}
              onClick={() => toggle(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggle(i);
              }}
              aria-expanded={openIndex === i}
            >
              <div className="faq-head">
                <FaqIcon />
                <span className="faq-q">{faq.q}</span>
              </div>
              <div className="faq-body">
                <div className="faq-body-inner">
                  <p className="faq-answer">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
