import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Content from '@/models/content';

export async function GET(req, { params }) {
  await connectDB();

  const slug = params.slug;

  try {
    const content = await Content.findOne({
      slug: { $regex: new RegExp(`^${slug}$`, 'i') }, // case-insensitive match
    });

    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    );
  }
}
