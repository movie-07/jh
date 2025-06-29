import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Content from '@/models/Content';

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await Content.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Content.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}

