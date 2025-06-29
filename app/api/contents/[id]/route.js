import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Content from '@/models/Content';

// Update content by ID
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const data = await req.json();

    if (!params.id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const updated = await Content.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 });
  }
}

// Delete content by ID
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    if (!params.id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const deleted = await Content.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 });
  }
}
