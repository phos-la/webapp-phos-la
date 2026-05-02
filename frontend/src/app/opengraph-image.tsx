import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Phos Wellness — Ketamine Healing Clinic of Los Angeles';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  // Satori (next/og) requires static-weight fonts, not variable fonts.
  // Fetch Cormorant Garamond at specific weights from Google Fonts CDN.
  const [fontRegular, fontSemiBold] = await Promise.all([
    fetch(
      'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_v86GnM.ttf',
    ).then((r) => r.arrayBuffer()),
    fetch(
      'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_iE9GnM.ttf',
    ).then((r) => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F0E8',
        padding: '60px 80px',
        fontFamily: '"Cormorant"',
      }}
    >
      {/* Logo mark */}
      <svg
        width="100"
        height="100"
        viewBox="0 0 200 200"
        fill="none"
        style={{ marginBottom: '28px' }}
      >
        <circle cx="100" cy="100" r="90" stroke="#80BCAC" strokeWidth="3" />
        <g
          stroke="#A8C8BC"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 92 L36 80 L48 86 L60 74 L72 86 L82 82 L92 92" />
          <path d="M108 92 L120 78 L132 86 L146 76 L160 86 L172 80 L182 90" />
          <path d="M44 110 L62 92 L74 100 L88 80 L100 60 L114 78 L126 92 L140 84 L156 100" />
        </g>
        <g
          stroke="#B88C50"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M100 142 C 92 124, 92 108, 100 92 C 108 108, 108 124, 100 142 Z" />
          <path d="M100 142 C 86 128, 80 112, 84 96 C 96 108, 102 124, 100 142 Z" />
          <path d="M100 142 C 114 128, 120 112, 116 96 C 104 108, 98 124, 100 142 Z" />
          <path d="M100 142 C 78 134, 66 120, 64 102 C 82 110, 96 124, 100 142 Z" />
          <path d="M100 142 C 122 134, 134 120, 136 102 C 118 110, 104 124, 100 142 Z" />
          <path d="M100 142 C 72 142, 54 134, 46 118 C 70 118, 90 128, 100 142 Z" />
          <path d="M100 142 C 128 142, 146 134, 154 118 C 130 118, 110 128, 100 142 Z" />
        </g>
        <g stroke="#358C7A" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M40 154 Q 60 148, 80 154 T 120 154 T 160 154" />
          <path d="M44 164 Q 64 158, 84 164 T 124 164 T 162 164" />
        </g>
      </svg>

      {/* Clinic name */}
      <div
        style={{
          fontSize: '72px',
          fontWeight: 600,
          color: '#1A2E3A',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '8px',
          display: 'flex',
        }}
      >
        PHOS WELLNESS
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: '26px',
          fontWeight: 400,
          color: '#4A6670',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '36px',
          display: 'flex',
        }}
      >
        Ketamine Healing Clinic · Los Angeles
      </div>

      {/* Divider */}
      <div
        style={{
          width: '60px',
          height: '1px',
          backgroundColor: '#80BCAC',
          marginBottom: '36px',
          display: 'flex',
        }}
      />

      {/* Tagline */}
      <div
        style={{
          fontSize: '34px',
          fontWeight: 300,
          color: '#1A2E3A',
          fontStyle: 'italic',
          textAlign: 'center',
          maxWidth: '800px',
          lineHeight: 1.4,
          display: 'flex',
        }}
      >
        Your protocol evolves with you.
      </div>

      {/* Domain */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          fontSize: '18px',
          color: '#80BCAC',
          letterSpacing: '0.08em',
          display: 'flex',
        }}
      >
        phos.la
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'Cormorant',
          data: fontRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Cormorant',
          data: fontSemiBold,
          style: 'normal',
          weight: 600,
        },
      ],
    },
  );
}
