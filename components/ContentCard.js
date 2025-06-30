'use client';

import { Button } from '@/components/ui/button';

export default function ContentCard({ data, onDelete, onEdit }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-2" >
      <img src={data.img} className="w-full h-48 object-cover rounded" /> 
      <h2 className="text-lg font-bold">{data.name}</h2>
      <p>⭐ {data.imdbRating} | 🎬 {data.type}</p>
      {/* <p className="text-sm text-gray-600">{data.description.slice(0, 80)}...</p> */}
      <div className="flex gap-2">
        <Button onClick={() => onEdit(data)}>✏️ Edit</Button>
        <Button variant="destructive" onClick={() => onDelete(data._id)}>🗑️ Delete</Button>
      </div>
    </div>
  );
}
