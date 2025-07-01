import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Content from '@/models/Content';

// GET all with search and pagination OR get single by slug
export async function GET(req, { params }) {
  await connectDB();

  // If slug is provided, fetch single item
  if (params?.slug) {
    const slugParam = params.slug?.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

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

  // Otherwise, return paginated list
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

// POST
export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const content = await Content.create(data);
  return NextResponse.json(content);
}
