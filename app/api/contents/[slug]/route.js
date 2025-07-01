export async function GET(req, { params }) {
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
