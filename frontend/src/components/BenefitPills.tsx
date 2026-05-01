export default function BenefitPills() {
  const chips = [
    'Treatment-resistant depression',
    'PTSD and complex trauma',
    'Generalized anxiety',
    'Chronic pain and CRPS',
    'Refractory migraine',
    'Acute suicidal ideation',
    'Social anxiety',
  ];

  return (
    <section className="benefits" data-screen-label="04 Conditions">
      <h2 className="benefits-title">Conditions we treat</h2>
      <div className="chips">
        {chips.map((chip) => (
          <span key={chip} className="chip">
            {chip}
          </span>
        ))}
      </div>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 12,
          color: 'var(--fg-subtle)',
          marginTop: 28,
          maxWidth: 560,
          lineHeight: 1.6,
          textAlign: 'center',
        }}
      >
        IV ketamine for depression, anxiety, PTSD, and chronic pain is an off-label use in the
        United States. Only Spravato (esketamine nasal spray) is FDA-approved for
        treatment-resistant depression.
      </p>
    </section>
  );
}
