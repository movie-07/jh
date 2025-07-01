import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Content from '@/models/Content';

// GET /api/contents?page=1&q=...
export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 20;

  const filter = {
    name: { $regex: q, $options: 'i' }
  };

  const contents = await Content.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Content.countDocuments(filter);

  return NextResponse.json({ contents, total });
}

// POST /api/contents
export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const content = await Content.create(data);
  return NextResponse.json(content);
}
