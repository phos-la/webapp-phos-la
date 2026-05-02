'use client';

export const dynamic = 'force-dynamic';

import nextDynamic from 'next/dynamic';
import config from '../../../../sanity.config';

const NextStudio = nextDynamic(() => import('next-sanity/studio').then((mod) => mod.NextStudio), {
  ssr: false,
});

export default function StudioPage() {
  return <NextStudio config={config} />;
}
