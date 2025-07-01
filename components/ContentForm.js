// 'use client';

// import { useState } from 'react';
// import { Input } from '../components/ui/input';
// import { Textarea } from '../components/ui/textarea';
// import { Button } from '../components/ui/button';

// export default function ContentForm({ initialData, onDone }) {
//   const [form, setForm] = useState(initialData || {
//     name: '',
//     slug: '',
//     img: '',
//     img2: '',
//     imdbRating: '',
//     description: '',
//     imdbLink: '',
//     genre: [],
//     type: 'movie',
//     downloadLinks: [
//       { name: '', url: '' },
//       { name: '', url: '' }
//     ],
//   });

//   const isWebSeries = form.type === 'webseries';

//   const updateField = (field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const updateLink = (index, key, value) => {
//     const updatedLinks = [...form.downloadLinks];
//     updatedLinks[index][key] = value;
//     updateField('downloadLinks', updatedLinks);
//   };

//   const handleSubmit = async () => {
//     const method = initialData ? 'PUT' : 'POST';
//     const url = initialData ? `/api/contents/${initialData._id}` : '/api/contents';
//     await fetch(url, {
//       method,
//       body: JSON.stringify(form),
//       headers: { 'Content-Type': 'application/json' },
//     });
//     onDone();
//   };

//   return (
//     <div className="bg-gray-100 p-4 rounded-xl mb-4 space-y-3">
//       <Input placeholder="Name" value={form.name} onChange={(e) => updateField('name', e.target.value)} />
//       <Input placeholder="Slug (optional - auto from name)" value={form.slug || ''} onChange={(e) => updateField('slug', e.target.value)} />
//       <Input placeholder="Poster Image URL" value={form.img} onChange={(e) => updateField('img', e.target.value)} />
//       <Input placeholder="Background Image URL" value={form.img2} onChange={(e) => updateField('img2', e.target.value)} />
//       <Input placeholder="IMDb Rating" value={form.imdbRating} onChange={(e) => updateField('imdbRating', e.target.value)} />
//       <Textarea placeholder="Description" value={form.description} onChange={(e) => updateField('description', e.target.value)} />
//       <Input placeholder="IMDb Link" value={form.imdbLink} onChange={(e) => updateField('imdbLink', e.target.value)} />
//       <Input placeholder="Genres (comma separated)" value={form.genre.join(',')} onChange={(e) => updateField('genre', e.target.value.split(','))} />
//       <select value={form.type} onChange={(e) => updateField('type', e.target.value)} className="w-full p-2 rounded">
//         <option value="movie">Movie</option>
//         <option value="webseries">Web Series</option>
//       </select>

//       <div className="space-y-2">
//         {form.downloadLinks.map((link, i) => (
//           <div key={i} className="flex gap-2">
//             <Input
//               placeholder={`Link Name ${i + 1}`}
//               value={link.name}
//               onChange={(e) => updateLink(i, 'name', e.target.value)}
//             />
//             <Input
//               placeholder={`URL ${i + 1}`}
//               value={link.url}
//               onChange={(e) => updateLink(i, 'url', e.target.value)}
//             />
//           </div>
//         ))}
//       </div>

//       {isWebSeries && (
//         <Button
//           type="button"
//           onClick={() => updateField('downloadLinks', [...form.downloadLinks, { name: '', url: '' }])}
//         >
//           ➕ Add Episode
//         </Button>
//       )}

//       <Button onClick={handleSubmit}>
//         {initialData ? 'Update' : 'Submit'}
//       </Button>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function ContentForm({ initialData = null, onDone }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    img: '',
    imdbRating: '',
    type: ''
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (res.ok) {
      onDone();
    } else {
      alert(result.error || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow mb-4">
      <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <Input name="slug" placeholder="Slug (unique)" value={formData.slug} onChange={handleChange} />
      <Input name="img" placeholder="Image URL" value={formData.img} onChange={handleChange} />
      <Input name="imdbRating" placeholder="IMDb Rating" value={formData.imdbRating} onChange={handleChange} />
      <Input name="type" placeholder="Type (movie/webserise)" value={formData.type} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" />
      <Button type="submit">{initialData ? 'Update' : 'Add'} Content</Button>
    </form>
  );
}
