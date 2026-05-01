export default function BenefitPills() {
  const chips = [
    "Deep nervous system relaxation",
    "Relief from tension, stress, or overwhelm",
    "A sense of clarity and groundedness",
    "More emotional spaciousness",
    "Greater connection to your body",
  ];

  return (
    <section className="benefits" data-screen-label="04 Benefits">
      <h2 className="benefits-title">As a result, you&apos;ll experience</h2>
      <div className="chips">
        {chips.map((chip) => (
          <span key={chip} className="chip">
            {chip}
          </span>
        ))}
      </div>
    </section>
  );
}
