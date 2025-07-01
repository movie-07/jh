// app/api/contents/[slug]/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Content from '@/models/Content';

export async function GET(req, { params }) {
  await connectDB();

  const slug = decodeURIComponent(params.slug)?.toLowerCase().trim();

  const content = await Content.findOne({ slug });

  if (!content) {
    return NextResponse.json({ error: 'Content not found' }, { status: 404 });
  }

  return NextResponse.json(content, { status: 200 });
}
