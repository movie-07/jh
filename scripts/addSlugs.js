// scripts/addSlugs.js
import 'dotenv/config';

import connectDB from '../lib/mongodb.js'; // ← use relative path
import Content from '../models/Content.js'; // ← use relative path

function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

async function main() {
  await connectDB();

  const contents = await Content.find();

  for (const item of contents) {
    if (!item.name) continue;

    const newSlug = generateSlug(item.name);

    if (item.slug !== newSlug) {
      await Content.updateOne({ _id: item._id }, { slug: newSlug });
      console.log(`✅ Updated slug for "${item.name}" → ${newSlug}`);
    } else {
      console.log(`✔ Slug already correct for "${item.name}"`);
    }
  }

  console.log('\n🎉 All slugs processed!');
  process.exit();
}

main();
