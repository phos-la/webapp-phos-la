/**
 * CI check: verifies every public page.tsx route has a corresponding entry in sitemap.ts.
 *
 * Scans frontend/src/app/ for page.tsx files, derives routes, and checks them against
 * the sitemap source. Static routes must appear as literal strings in sitemap.ts.
 * Dynamic routes ([slug]) must be covered by a known dynamic family (Sanity-driven).
 *
 * Exits with code 1 if any public routes are missing coverage.
 *
 * Usage: bun run scripts/check-sitemap-coverage.ts
 */

import { readFileSync, readdirSync } from 'node:fs';
import { resolve, relative, join } from 'node:path';

const APP_DIR = resolve(import.meta.dirname, '../src/app');
const SITEMAP_PATH = resolve(APP_DIR, 'sitemap.ts');

/**
 * Static routes that should NOT be in the sitemap (admin, success/thanks landing,
 * API routes, Sanity Studio, redirect-only).
 */
const EXCLUDED_ROUTES = new Set<string>([
  '/book/thanks', // post-submit landing, noindex
  '/book/thanks/success', // post-payment landing, noindex
  '/faq', // page kept reachable by URL but intentionally unlinked (not in nav or sitemap)
]);

const EXCLUDED_ROUTE_PREFIXES = ['/studio', '/api/'];

/**
 * Dynamic route families covered by Sanity-driven sitemap entries.
 */
const DYNAMIC_ROUTE_FAMILIES = ['/treatments/[slug]', '/blog/[slug]'];

function filePathToRoute(filePath: string): string {
  const route = relative(APP_DIR, filePath)
    .replace(/\/?page\.tsx$/, '')
    .replace(/\([\w-]+\)\//g, ''); // strip route groups like (legal)/

  return route === '' ? '/' : `/${route}`;
}

function isDynamicRoute(route: string): boolean {
  return route.includes('[');
}

function isDynamicRouteCovered(route: string): boolean {
  return DYNAMIC_ROUTE_FAMILIES.some((family) => route === family);
}

function findPages(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      findPages(full, out);
    } else if (entry.isFile() && entry.name === 'page.tsx') {
      out.push(full);
    }
  }
  return out;
}

function main() {
  const sitemapSource = readFileSync(SITEMAP_PATH, 'utf-8');
  const pages = findPages(APP_DIR);

  const missing: string[] = [];
  let checked = 0;

  for (const page of pages) {
    const route = filePathToRoute(page);

    if (EXCLUDED_ROUTES.has(route)) continue;
    if (EXCLUDED_ROUTE_PREFIXES.some((prefix) => route.startsWith(prefix))) continue;

    checked++;

    if (isDynamicRoute(route)) {
      if (!isDynamicRouteCovered(route)) {
        missing.push(route);
      }
      continue;
    }

    // Static route: check the literal path appears in sitemap.ts (as '/x' arg to abs()).
    const literal = `'${route}'`;
    if (!sitemapSource.includes(literal)) {
      missing.push(route);
    }
  }

  if (missing.length > 0) {
    console.error('\nSitemap coverage check FAILED.\n');
    console.error('The following public routes are missing from src/app/sitemap.ts:\n');
    for (const route of missing.sort()) {
      console.error(`  - ${route}`);
    }
    console.error(
      '\nFix options:',
      '\n  1. Add the route to staticRoutes in src/app/sitemap.ts',
      '\n  2. Add a new dynamic family to DYNAMIC_ROUTE_FAMILIES in this script',
      '\n     (paired with a Sanity query in sitemap.ts)',
      '\n  3. Add to EXCLUDED_ROUTES if the page should not be indexed.\n',
    );
    process.exit(1);
  }

  console.log(`Sitemap coverage check passed. ${checked} routes verified.`);
}

main();
export {};
