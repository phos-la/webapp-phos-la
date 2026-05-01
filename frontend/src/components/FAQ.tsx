'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'What is IV ketamine therapy?',
    a: "IV ketamine blocks NMDA glutamate receptors, triggering rapid increases in BDNF (brain-derived neurotrophic factor) and new synaptic connections in the prefrontal cortex. Unlike SSRIs, which modulate serotonin over weeks, ketamine's antidepressant effect often appears within hours to days. A standard initial series is six infusions over two to three weeks.",
  },
  {
    q: 'Who is a candidate?',
    a: "Adults with treatment-resistant depression, anxiety, PTSD, or chronic pain who haven't found adequate relief from conventional treatments. We use a pre-screening process. People are generally not candidates if they have schizophrenia, active psychosis, bipolar mania, uncontrolled cardiovascular disease or hypertension, or pregnancy. Your candidacy will be confirmed at your initial consultation.",
  },
  {
    q: 'How many sessions will I need?',
    a: "Most patients start with six infusions over two to three weeks. After that, your PA reviews your response and discusses maintenance timing based on how you're doing, not a preset schedule.",
  },
  {
    q: 'What happens during an infusion?',
    a: "Your PA meets with you first to confirm your protocol for the session. The infusion itself typically runs 40 to 60 minutes. You'll experience a transient dissociative state. Afterward, your PA checks in to discuss your experience and note any adjustments for your next visit. You'll need a driver to take you home.",
  },
  {
    q: 'Does insurance cover IV ketamine?',
    a: "IV ketamine for mood disorders is an off-label use and is not covered by most insurance plans. It's cash-pay. HSA and FSA funds are eligible. Spravato (esketamine nasal spray), the FDA-approved version for treatment-resistant depression, will be available at our clinic soon and is covered by many insurance plans.",
  },
  {
    q: 'What makes Phos different from other LA clinics?',
    a: "At most clinics, you'll see a nurse during your infusions and a physician only periodically. Here, a licensed PA meets with you before and after every single infusion, actively adjusting your dosing, duration, and supportive therapies each visit. Led by Dr. Christa Riley, board-certified anesthesiologist and military veteran, with the highest published success rate in the LA market.",
  },
];

const FaqIcon = () => (
  <svg className="faq-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 20 C 4 11, 11 4, 20 4 C 20 13, 13 20, 4 20 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M4 20 L 17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
          <h2 className="section-title">Questions you might have</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className={`faq-row${openIndex === i ? ' is-open' : ''}`}
              onClick={() => toggle(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') toggle(i);
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
