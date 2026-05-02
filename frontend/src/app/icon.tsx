import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F0E8',
        borderRadius: '6px',
      }}
    >
      <svg width="26" height="26" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="90" stroke="#80BCAC" strokeWidth="8" />
        <g
          stroke="#B88C50"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M100 142 C 92 124, 92 108, 100 92 C 108 108, 108 124, 100 142 Z" />
          <path d="M100 142 C 86 128, 80 112, 84 96 C 96 108, 102 124, 100 142 Z" />
          <path d="M100 142 C 114 128, 120 112, 116 96 C 104 108, 98 124, 100 142 Z" />
        </g>
        <g stroke="#358C7A" strokeWidth="7" fill="none" strokeLinecap="round">
          <path d="M44 162 Q 64 156, 84 162 T 124 162 T 158 162" />
        </g>
      </svg>
    </div>,
    { ...size },
  );
}
