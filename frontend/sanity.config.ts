import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/lib/sanity/schemas';
import { structure } from './src/lib/sanity/structure';

export default defineConfig({
  projectId: 'yfse28ye',
  dataset: 'production',
  title: 'Phos Wellness',
  basePath: '/studio',
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool({ structure })],
  autoUpdates: false,
});
