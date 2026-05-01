"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    num: "1",
    title: "Discovery Call",
    body: "A short conversation to get to know each other, feel into the connection, and see if this experience is the right fit for you at this moment.",
  },
  {
    num: "2",
    title: "Preparation",
    body: "Before your session or retreat, we'll stay in touch by email. You'll receive simple guidance to help you slow down, prepare your body, and set intention.",
  },
  {
    num: "3",
    title: "The session",
    body: "Held in a peaceful forest space, each session blends touch, breath, and presence — guided by your body's rhythm and what naturally wants to unfold.",
  },
  {
    num: "4",
    title: "Integration",
    body: "After your session, you'll have time to rest and reflect. You're welcome to stay in the forest overnight to let the experience settle into your body and heart.",
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
        card.style.setProperty("--reveal", String(reveal));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      className="section section--pinned"
      data-screen-label="06 Process"
    >
      <div className="pinned-stage" id="processStage" ref={stageRef}>
        <div className="pinned-pin">
          <div className="section-inner">
            <div className="section-head">
              <span className="label-pill">How we&apos;ll work together</span>
              <h2 className="section-title">From intention to healing</h2>
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
