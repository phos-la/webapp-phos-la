import { urlFor } from '@/lib/sanity/image';
import type { SanityImageSource } from '@sanity/image-url';

export interface ClinicSectionData {
  headline?: string;
  body?: string;
  address?: string;
  mapsUrl?: string;
  chips?: string[];
  photo1?: SanityImageSource;
  photo2?: SanityImageSource;
}

const DEFAULTS: Required<ClinicSectionData> = {
  headline: 'Private, calm, Westwood',
  body: 'Our clinic is on the third floor of 1762 Westwood Blvd, a quiet suite designed for medical privacy and patient comfort. No waiting room full of strangers. No sterile hospital feel. Just a calm, unhurried space where you can arrive, settle in, and focus entirely on your session.',
  address: '1762 Westwood Blvd, Ste 320',
  mapsUrl: 'https://maps.google.com/?q=1762+Westwood+Blvd+Suite+320+Los+Angeles+CA+90024',
  chips: ['Private suite', 'Medical-grade monitoring', 'Near UCLA'],
  photo1: null as unknown as SanityImageSource,
  photo2: null as unknown as SanityImageSource,
};

export default function TheSpace({ data }: { data?: ClinicSectionData }) {
  const d = { ...DEFAULTS, ...data };

  const photo1Src = d.photo1
    ? urlFor(d.photo1).width(1600).quality(80).auto('format').url()
    : 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1400&q=80&auto=format&fit=crop';
  const photo2Src = d.photo2
    ? urlFor(d.photo2).width(1600).quality(80).auto('format').url()
    : 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=80&auto=format&fit=crop';
  const chips = d.chips?.length ? d.chips : DEFAULTS.chips;

  return (
    <section className="space-section" data-screen-label="08 The Clinic">
      <div className="space-cards">
        <div className="space-card space-text">
          <h2 className="space-headline">{d.headline}</h2>
          <p className="space-body">{d.body}</p>
          <a className="space-link" href={d.mapsUrl} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 21 C 6 14, 5 9, 8.5 6 C 12 3, 14 6, 14 6 C 14 6, 17 9, 14 13 C 12 16, 12 21, 12 21 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <circle cx="11.5" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
            {d.address}
            <span aria-hidden="true">&rarr;</span>
          </a>
          <div className="space-chips">
            {chips.map((chip) => (
              <span key={chip} className="space-chip">
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="space-card space-photos">
          <div
            className="space-photo"
            role="img"
            aria-label="Calm private clinical suite"
            style={{ background: `url(${photo1Src}) center 20% / cover no-repeat` }}
          />
          <div
            className="space-photo"
            role="img"
            aria-label="Medical professional with patient"
            style={{ background: `url(${photo2Src}) center 20% / cover no-repeat` }}
          />
        </div>
      </div>
    </section>
  );
}
