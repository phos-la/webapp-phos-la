export interface ConditionsSectionData {
  heading?: string;
  conditions?: string[];
  disclaimer?: string;
}

const DEFAULTS: Required<ConditionsSectionData> = {
  heading: 'Conditions we treat',
  conditions: [
    'Treatment-resistant depression',
    'PTSD and complex trauma',
    'Generalized anxiety',
    'Chronic pain and CRPS',
    'Refractory migraine',
    'Acute suicidal ideation',
    'Social anxiety',
  ],
  disclaimer:
    'IV ketamine for depression, anxiety, PTSD, and chronic pain is an off-label use in the United States. Only Spravato (esketamine nasal spray) is FDA-approved for treatment-resistant depression.',
};

export default function BenefitPills({ data }: { data?: ConditionsSectionData }) {
  const d = { ...DEFAULTS, ...data };
  const chips = d.conditions?.length ? d.conditions : DEFAULTS.conditions;

  return (
    <section className="benefits" data-screen-label="04 Conditions">
      <h2 className="benefits-title">{d.heading}</h2>
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
          margin: '28px auto 0',
          maxWidth: 560,
          lineHeight: 1.6,
          textAlign: 'center',
        }}
      >
        {d.disclaimer}
      </p>
    </section>
  );
}
