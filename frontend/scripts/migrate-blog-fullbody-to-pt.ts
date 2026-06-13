/**
 * One-off migration. The blogPost.fullBody field changed from a Markdown
 * string to Portable Text (rich text). This converts any document whose
 * fullBody is still a string (published + drafts) into Portable Text blocks
 * so existing notes keep rendering after the schema change.
 *
 * Handles the Markdown subset our notes use: blank-line paragraphs, ## / ###
 * / #### headings, > blockquotes, --- rules (dropped), and inline **bold**,
 * *italic*, [text](url) links.
 *
 * Usage: SANITY_WRITE_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2-) \
 *        bun run scripts/migrate-blog-fullbody-to-pt.ts
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yfse28ye',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  // raw so published + draft documents are returned as distinct rows, not
  // collapsed (otherwise the published doc behind a draft gets skipped).
  perspective: 'raw',
});

let keySeq = 0;
const key = () => `k${(keySeq++).toString(36)}`;

type Span = { _type: 'span'; _key: string; text: string; marks: string[] };
type MarkDef = { _key: string; _type: 'link'; href: string };

/** Parse inline **bold**, *italic*, and [text](url) into spans + link defs. */
function parseInline(text: string): { children: Span[]; markDefs: MarkDef[] } {
  const children: Span[] = [];
  const markDefs: MarkDef[] = [];
  // Token regex: bold, italic, or link. Anything else is literal text.
  const re = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  const push = (t: string, marks: string[]) => {
    if (t) children.push({ _type: 'span', _key: key(), text: t, marks });
  };
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) push(text.slice(last, m.index), []);
    if (m[2] !== undefined) {
      push(m[2], ['strong']);
    } else if (m[4] !== undefined) {
      push(m[4], ['em']);
    } else if (m[6] !== undefined && m[7] !== undefined) {
      const defKey = key();
      markDefs.push({ _key: defKey, _type: 'link', href: m[7] });
      push(m[6], [defKey]);
    }
    last = re.lastIndex;
  }
  if (last < text.length) push(text.slice(last), []);
  if (children.length === 0) push('', []);
  return { children, markDefs };
}

function block(style: string, text: string) {
  const { children, markDefs } = parseInline(text.trim());
  return { _type: 'block', _key: key(), style, markDefs, children };
}

function markdownToBlocks(md: string) {
  return md
    .split(/\n{2,}/)
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((para) => {
      if (/^####\s+/.test(para)) return block('h4', para.replace(/^####\s+/, ''));
      if (/^###\s+/.test(para)) return block('h3', para.replace(/^###\s+/, ''));
      if (/^##\s+/.test(para)) return block('h2', para.replace(/^##\s+/, ''));
      if (/^#\s+/.test(para)) return block('h2', para.replace(/^#\s+/, ''));
      if (/^>\s?/.test(para))
        return block('blockquote', para.replace(/^>\s?/gm, '').replace(/\n/g, ' '));
      if (/^-{3,}$/.test(para)) return null; // horizontal rule, drop it
      // Soft-wrap single newlines inside a paragraph back into one line.
      return block('normal', para.replace(/\n/g, ' '));
    })
    .filter((b): b is NonNullable<typeof b> => b !== null);
}

async function run() {
  const docs = await client.fetch<Array<{ _id: string; title: string; fullBody: unknown }>>(
    '*[_type == "blogPost" && defined(fullBody)]{_id, title, fullBody}',
  );

  let migrated = 0;
  for (const doc of docs) {
    if (typeof doc.fullBody !== 'string') {
      console.log(`  skip (already Portable Text): ${doc._id} (${doc.title})`);
      continue;
    }
    const blocks = markdownToBlocks(doc.fullBody);
    await client.patch(doc._id).set({ fullBody: blocks }).commit();
    migrated += 1;
    console.log(`  migrated: ${doc._id} (${doc.title}) ${blocks.length} blocks`);
  }
  console.log(`Done. ${migrated} document(s) migrated, ${docs.length - migrated} skipped.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
