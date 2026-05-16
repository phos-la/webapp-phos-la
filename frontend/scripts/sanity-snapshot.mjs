import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const env = fs
  .readFileSync('.env.local', 'utf8')
  .split('\n')
  .reduce((a, l) => {
    const m = l.match(/^([A-Z_]+)=(.*)$/);
    if (m) a[m[1]] = m[2].replace(/^["']|["']$/g, '');
    return a;
  }, {});

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  token: env.SANITY_API_TOKEN,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
});

const docs = await client.fetch(`*[!(_id in path('drafts.**'))]`);
fs.writeFileSync('../../context/sanity-current-state.json', JSON.stringify(docs, null, 2));
console.log(`fetched ${docs.length} docs`);
console.log('types:', [...new Set(docs.map((d) => d._type))].sort().join(', '));
console.log('ids:', docs.map((d) => `${d._id} (${d._type})`).join('\n'));
