import connectDB from '@/lib/mongodb';
import Content from '@/models/Content';

export async function GET(req, { params }) {
  await connectDB();

  const slug = params.slug;
  const content = await Content.findOne({ slug });

  if (!content) {
    return new Response(JSON.stringify({ error: 'Content not found' }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(content), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
