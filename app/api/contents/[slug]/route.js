import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Content from '@/models/Content';

export async function GET(req, { params }) {
  await connectDB();

  const slugParam = decodeURIComponent(params.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'));

  const allContents = await Content.find();

  const item = allContents.find((item) => {
    const raw = item.slug || item.name || '';
    const generatedSlug = raw.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    return generatedSlug === slugParam;
  });

  if (!item) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }

  return NextResponse.json(item);
}
