'use client';

import { useEffect, useRef } from 'react';

const steps = [
  {
    num: '1',
    title: 'Screening call',
    body: "A short consultation to understand your history, walk through candidacy, and answer your questions. If you're a fit, we'll get you scheduled. If not, we'll tell you honestly and point you in the right direction.",
  },
  {
    num: '2',
    title: 'PA evaluation',
    body: 'Before your first infusion, your PA reviews your medical history, current medications, and goals. This is where your protocol is set, including dosing, session duration, and any supportive therapies like NAD+ or magnesium.',
  },
  {
    num: '3',
    title: 'Your infusions',
    body: "Six sessions over two to three weeks, administered in our Westwood clinic under medical supervision. Your PA checks in before and after every infusion, adjusting your protocol based on how you're responding, not a fixed template.",
  },
  {
    num: '4',
    title: 'Integration support',
    body: "After your series, your PA discusses your outcomes and next steps. Whether that's maintenance sessions, connecting with a therapist, or both, you leave with a clear plan rather than a handoff.",
  },
];

const STEP_WINDOWS: [number, number][] = [
  [0.06, 0.26],
  [0.26, 0.46],
  [0.46, 0.66],
  [0.66, 0.86],
];

export default function ProcessSteps() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const cards = cardsRef.current;
    const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

    const update = () => {
      const r = stage.getBoundingClientRect();
      const total = stage.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / total));

      cards.forEach((card, i) => {
        if (!card) return;
        const [a, b] = STEP_WINDOWS[i] ?? [1, 1];
        const reveal = clamp01((p - a) / (b - a));
        card.style.setProperty('--reveal', String(reveal));
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section className="section section--pinned" data-screen-label="06 Process">
      <div className="pinned-stage" id="processStage" ref={stageRef}>
        <div className="pinned-pin">
          <div className="section-inner">
            <div className="section-head">
              <span className="label-pill">What to expect</span>
              <h2 className="section-title">From first call to integration</h2>
            </div>

            <div className="steps" id="processSteps">
              {steps.map((step, i) => (
                <article
                  key={step.num}
                  className="step-card"
                  ref={(el) => {
                    cardsRef.current[i] = el;
                  }}
                >
                  <span className="step-numeral">{step.num}</span>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-body">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
