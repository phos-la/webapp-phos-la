import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '1shyjz84',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function uploadFromUrl(url: string, filename: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload('image', buf, {
    filename,
    contentType: 'image/jpeg',
  });
  console.log(`  ✓ ${filename} → ${asset._id}`);
  return asset._id;
}

function imageRef(assetId: string, key?: string) {
  const obj: Record<string, unknown> = {
    _type: 'image',
    asset: { _type: 'reference', _ref: assetId },
    hotspot: { x: 0.5, y: 0.5, height: 0.5, width: 0.5 },
    crop: { top: 0, bottom: 0, left: 0, right: 0 },
  };
  if (key) obj._key = key;
  return obj;
}

async function run() {
  console.log('Uploading images to Sanity…\n');

  // ── Hero ────────────────────────────────────────────────────────────────────
  console.log('1. Hero image');
  const heroId = await uploadFromUrl(
    'https://images.unsplash.com/photo-1545389336-cf090694435e?w=1600&q=80&auto=format&fit=crop',
    'hero-parallax.jpg',
  );
  await client
    .patch('heroSection-singleton')
    .set({ heroImage: imageRef(heroId) })
    .commit();

  // ── Provider portrait ───────────────────────────────────────────────────────
  console.log('\n2. Provider portrait');
  const portraitId = await uploadFromUrl(
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80&auto=format&fit=crop',
    'provider-portrait.jpg',
  );
  await client
    .patch('providerSection-singleton')
    .set({ portrait: imageRef(portraitId) })
    .commit();

  // ── Clinic / The Space ──────────────────────────────────────────────────────
  console.log('\n3. Clinic photos');
  const space1Id = await uploadFromUrl(
    'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1400&q=80&auto=format&fit=crop',
    'clinic-space-1.jpg',
  );
  const space2Id = await uploadFromUrl(
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=80&auto=format&fit=crop',
    'clinic-space-2.jpg',
  );
  await client
    .patch('clinicSection-singleton')
    .set({ photo1: imageRef(space1Id), photo2: imageRef(space2Id) })
    .commit();

  // ── Blog post images ────────────────────────────────────────────────────────
  console.log('\n4. Blog post images');
  const blogUrls = [
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545389336-cf090694435e?w=900&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80&auto=format&fit=crop',
  ];
  for (let i = 0; i < blogUrls.length; i++) {
    const assetId = await uploadFromUrl(blogUrls[i], `blog-${i + 1}.jpg`);
    await client
      .patch(`blogPost-${i + 1}`)
      .set({ image: imageRef(assetId) })
      .commit();
  }

  // ── Glimpses row 1 ──────────────────────────────────────────────────────────
  console.log('\n5. Glimpses row 1');
  const row1Urls = [
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511497584788-876760111969?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1486520299386-6d106b22014b?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=600&q=80&auto=format&fit=crop',
  ];
  const row1Ids = await Promise.all(
    row1Urls.map((url, i) => uploadFromUrl(url, `glimpse-r1-${i + 1}.jpg`)),
  );
  await client
    .patch('glimpsesSection-singleton')
    .set({ row1Images: row1Ids.map((id, i) => imageRef(id, `r1-${i}`)) })
    .commit();

  // ── Glimpses row 2 ──────────────────────────────────────────────────────────
  console.log('\n6. Glimpses row 2');
  const row2Urls = [
    'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504198266287-1659872e6590?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1486520299386-6d106b22014b?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80&auto=format&fit=crop',
  ];
  const row2Ids = await Promise.all(
    row2Urls.map((url, i) => uploadFromUrl(url, `glimpse-r2-${i + 1}.jpg`)),
  );
  await client
    .patch('glimpsesSection-singleton')
    .set({ row2Images: row2Ids.map((id, i) => imageRef(id, `r2-${i}`)) })
    .commit();

  console.log('\nDone. All images uploaded and documents patched.');
  console.log('Go to /studio and publish the updated documents to make them live.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
