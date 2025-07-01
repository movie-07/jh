'use client';

import { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

export default function ContentForm({ initialData = null, onDone }) {
  const [form, setForm] = useState({
    name: '',
    slug: '',
    img: '',
    img2: '',
    imdbRating: '',
    description: '',
    imdbLink: '',
    genre: [],
    type: 'movie',
    downloadLinks: [
      { name: '', url: '' },
      { name: '', url: '' },
    ],
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        genre: Array.isArray(initialData.genre)
          ? initialData.genre
          : initialData.genre?.split(',') || [],
      });
    }
  }, [initialData]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateDownloadLink = (index, field, value) => {
    const updated = [...form.downloadLinks];
    updated[index][field] = value;
    updateField('downloadLinks', updated);
  };

  const addDownloadLink = () => {
    updateField('downloadLinks', [...form.downloadLinks, { name: '', url: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = initialData ? 'PUT' : 'POST';
    const url = initialData
      ? `/api/contents/${initialData.slug || initialData._id}`
      : '/api/contents';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const result = await res.json();

    if (res.ok) {
      onDone();
    } else {
      alert(result.error || 'Failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-xl mb-4 space-y-4">
      <Input placeholder="Name" value={form.name} onChange={(e) => updateField('name', e.target.value)} />
      <Input placeholder="Slug (optional)" value={form.slug} onChange={(e) => updateField('slug', e.target.value)} />
      <Input placeholder="Poster Image URL" value={form.img} onChange={(e) => updateField('img', e.target.value)} />
      <Input placeholder="Background Image URL" value={form.img2} onChange={(e) => updateField('img2', e.target.value)} />
      <Input placeholder="IMDb Rating" value={form.imdbRating} onChange={(e) => updateField('imdbRating', e.target.value)} />
      <Textarea placeholder="Description" value={form.description} onChange={(e) => updateField('description', e.target.value)} />
      <Input placeholder="IMDb Link" value={form.imdbLink} onChange={(e) => updateField('imdbLink', e.target.value)} />
      <Input
        placeholder="Genres (comma separated)"
        value={form.genre.join(',')}
        onChange={(e) => updateField('genre', e.target.value.split(',').map((g) => g.trim()))}
      />

      <select
        className="w-full border rounded p-2"
        value={form.type}
        onChange={(e) => updateField('type', e.target.value)}
      >
        <option value="movie">Movie</option>
        <option value="webseries">Web</option>
      </select>

      {/* Download Links */}
      <div className="space-y-2">
        {form.downloadLinks.map((link, i) => (
          <div key={i} className="flex gap-2">
            <Input
              placeholder={`Link ${i + 1} Name`}
              value={link.name}
              onChange={(e) => updateDownloadLink(i, 'name', e.target.value)}
            />
            <Input
              placeholder={`Link ${i + 1} URL`}
              value={link.url}
              onChange={(e) => updateDownloadLink(i, 'url', e.target.value)}
            />
          </div>
        ))}
      </div>

      {form.type === 'webseries' && (
        <Button type="button" onClick={addDownloadLink}>
          ➕ Add Episode
        </Button>
      )}

      <Button type="submit">{initialData ? 'Update' : 'Submit'}</Button>
    </form>
  );
}
