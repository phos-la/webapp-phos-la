"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const image = imageRef.current;
    if (!stage || !image) return;

    const update = () => {
      const r = stage.getBoundingClientRect();
      const total = stage.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / total));
      image.style.setProperty("--p", String(p));
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
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero-inner">
        <span className="hero-pill" aria-label="Availability">
          <span className="hero-pill-dot" aria-hidden="true" />
          Accepting new patients in Westwood
        </span>

        <h1 className="hero-headline">
          Your protocol
          <br />
          evolves with you.
        </h1>

        <p className="hero-sub">
          IV ketamine therapy in a private Los Angeles practice &mdash; a licensed
          provider evaluates your response <em>before and after every infusion</em>,
          adjusting your treatment in real time.
        </p>

        <a className="hero-cta" href="#consult">
          Schedule a consultation
          <span className="hero-cta-arrow" aria-hidden="true">
            &rarr;
          </span>
        </a>
      </div>

      <div className="hero-parallax" id="heroParallax" ref={stageRef}>
        <div className="hero-parallax-pin">
          <figure
            className="hero-image"
            id="heroImage"
            ref={imageRef}
            aria-label="Treatment room interior"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=1600&q=80&auto=format&fit=crop"
              alt=""
              loading="lazy"
            />
            <div className="hero-image-overlay">
              <svg
                className="hero-image-mark"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 21 C 7 18, 6 12, 11 4 C 16 8, 17 15, 12 21 Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h2 className="hero-image-headline">
                The only LA clinic in the room after every infusion.
              </h2>
              <p className="hero-image-body">
                Most clinics hand you off to a nurse and check in periodically.
                At Phos, your PA is there before and after every session,
                adjusting your dosing, duration, and supportive therapies based
                on how you&apos;re actually responding. Led by Dr. Christa Riley,
                board-certified anesthesiologist and military veteran.
              </p>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
