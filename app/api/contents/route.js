import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Content from '@/models/Content';

// GET /api/contents/[slug]
export async function GET(req, { params }) {
  await connectDB();

  const slugParam = params.slug?.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

  if (!slugParam) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }

  const allContents = await Content.find();

  const match = allContents.find((item) => {
    const raw = item.slug || item.name || '';
    const generatedSlug = raw.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    return generatedSlug === slugParam;
  });

  if (!match) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }

  return NextResponse.json(match);
}
