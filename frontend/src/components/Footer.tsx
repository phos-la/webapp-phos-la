import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

export interface FooterSectionData {
  logo?: unknown;
  logoAlt?: string;
  businessName?: string;
  address?: string;
  phone?: string;
  email?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  disclaimer?: string;
}

const DEFAULTS: Omit<Required<FooterSectionData>, 'logo' | 'logoAlt'> = {
  businessName: 'Phos Wellness',
  address: '1762 Westwood Blvd, Ste 320, Los Angeles, CA 90024',
  phone: '(424) 278-4241',
  email: 'support@ketaminehealing.com',
  instagramUrl: 'https://www.instagram.com/ketaminehealingla',
  facebookUrl: 'https://www.facebook.com/ketaminehealingla',
  disclaimer:
    'IV ketamine for mood disorders is an off-label use. Spravato (esketamine) is FDA-approved for TRD.',
};

const PhosLogoMark = ({ size = 72 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" aria-hidden="true">
    <circle cx="100" cy="100" r="90" stroke="#80BCAC" strokeWidth="3" />
    <g stroke="#A8C8BC" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 92 L36 80 L48 86 L60 74 L72 86 L82 82 L92 92" />
      <path d="M108 92 L120 78 L132 86 L146 76 L160 86 L172 80 L182 90" />
      <path d="M44 110 L62 92 L74 100 L88 80 L100 60 L114 78 L126 92 L140 84 L156 100" />
    </g>
    <g stroke="#B88C50" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M100 142 C 92 124, 92 108, 100 92 C 108 108, 108 124, 100 142 Z" />
      <path d="M100 142 C 86 128, 80 112, 84 96 C 96 108, 102 124, 100 142 Z" />
      <path d="M100 142 C 114 128, 120 112, 116 96 C 104 108, 98 124, 100 142 Z" />
      <path d="M100 142 C 78 134, 66 120, 64 102 C 82 110, 96 124, 100 142 Z" />
      <path d="M100 142 C 122 134, 134 120, 136 102 C 118 110, 104 124, 100 142 Z" />
      <path d="M100 142 C 72 142, 54 134, 46 118 C 70 118, 90 128, 100 142 Z" />
      <path d="M100 142 C 128 142, 146 134, 154 118 C 130 118, 110 128, 100 142 Z" />
      <path d="M100 142 C 70 148, 46 144, 32 132 C 58 130, 84 134, 100 142 Z" />
      <path d="M100 142 C 130 148, 154 144, 168 132 C 142 130, 116 134, 100 142 Z" />
    </g>
    <g stroke="#358C7A" strokeWidth="3" fill="none" strokeLinecap="round">
      <path d="M40 154 Q 60 148, 80 154 T 120 154 T 160 154" />
      <path d="M44 164 Q 64 158, 84 164 T 124 164 T 162 164" />
      <path d="M48 174 Q 68 168, 88 174 T 128 174 T 158 174" />
    </g>
  </svg>
);

export default function Footer({ data }: { data?: FooterSectionData }) {
  const d = { ...DEFAULTS, ...data };
  const logoUrl = data?.logo ? urlFor(data.logo as never).width(144).height(144).url() : null;
  const logoAlt = data?.logoAlt ?? d.businessName;

  return (
    <footer className="site-footer" data-screen-label="14 Footer">
      <div className="footer-row">
        <div className="footer-col">
          {logoUrl ? (
            <Image src={logoUrl} alt={logoAlt} width={72} height={72} />
          ) : (
            <PhosLogoMark size={72} />
          )}
          <p className="footer-line">
            <strong>{d.businessName}</strong> &nbsp;&mdash;&nbsp; {d.address}
          </p>
          <p className="footer-line">
            <a href={`tel:${d.phone.replace(/\D/g, '')}`} style={{ color: 'inherit' }}>
              {d.phone}
            </a>
            &nbsp;&nbsp;&middot;&nbsp;&nbsp;
            <a href={`mailto:${d.email}`} style={{ color: 'inherit' }}>
              {d.email}
            </a>
          </p>
          <p className="footer-line is-small" style={{ marginTop: 8 }}>
            &copy; {new Date().getFullYear()} Ketamine Healing Clinic of Los Angeles. {d.disclaimer}
          </p>
          <div className="footer-socials">
            <a
              href={d.instagramUrl}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="footer-social" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href={d.facebookUrl} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg className="footer-social" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 8h2.5V5H14c-1.7 0-3 1.3-3 3v2H9v3h2v8h3v-8h2.5l.5-3H14V8.5c0-.3.2-.5.5-.5z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <span className="footer-watermark" aria-hidden="true">
        Phos
      </span>
    </footer>
  );
}
