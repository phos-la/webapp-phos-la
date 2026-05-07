'use client';

import dynamic from 'next/dynamic';

// React Flow uses browser APIs — load client-side only
const CookieFlowDiagram = dynamic(() => import('@/components/flow/CookieFlowDiagram'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui',
        color: '#64748b',
      }}
    >
      Loading diagram…
    </div>
  ),
});

export default function Flow2Page() {
  return <CookieFlowDiagram />;
}
