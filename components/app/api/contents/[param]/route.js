// ✅ app/api/contents/[param]/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Content from '@/models/Content';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  await connectDB();
  const param = params.param;

  const content = mongoose.Types.ObjectId.isValid(param)
    ? await Content.findById(param)
    : await Content.findOne({ slug: param });

  if (!content) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(content);
}

export async function PUT(req, { params }) {
  await connectDB();
  const param = params.param;
  const data = await req.json();

  const content = mongoose.Types.ObjectId.isValid(param)
    ? await Content.findById(param)
    : await Content.findOne({ slug: param });

  if (!content) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const updated = await Content.findByIdAndUpdate(content._id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const param = params.param;

  const content = mongoose.Types.ObjectId.isValid(param)
    ? await Content.findById(param)
    : await Content.findOne({ slug: param });

  if (!content) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await Content.findByIdAndDelete(content._id);
  return NextResponse.json({ message: 'Deleted' });
}
