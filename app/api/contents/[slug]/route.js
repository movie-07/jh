import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Content from '@/models/content';

export async function GET(req, { params }) {
  await connectDB();

  const slug = params.slug?.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

  const content = await Content.findOne({
    $or: [
      { slug: slug },
      { name: { $regex: new RegExp(`^${slug.replace(/-/g, ' ')}`, 'i') } }
    ]
  });

  if (!content) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }

  return NextResponse.json(content);
}
