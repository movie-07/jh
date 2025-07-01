// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';

// export default function ContentCard({ data, onDelete, onEdit }) {
//   const router = useRouter();

//   // Delete handler example
//   async function handleDelete(slug) {
//     try {
//       const res = await fetch(`/api/contents/${slug}`, {
//         method: 'DELETE',
//       });
//       if (!res.ok) throw new Error('Failed to delete');

//       onDelete(slug); // Notify parent for UI update if needed
//       router.refresh(); // Optional: refresh page or re-fetch data
//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   // Edit handler example (calls parent's onEdit with data)
//   function handleEdit() {
//     onEdit(data);
//   }

//   return (
//     <div className="bg-white p-4 rounded-xl shadow space-y-2" >
//       <img src={data.img} className="w-full h-48 object-cover rounded" /> 
//       <h2 className="text-lg font-bold">{data.name}</h2>
//       <p>⭐ {data.imdbRating} | 🎬 {data.type}</p>
//       <div className="flex gap-2">
//         <Button onClick={handleEdit}>✏️ Edit</Button>
//         <Button variant="destructive" onClick={() => handleDelete(data.slug)}>🗑️ Delete</Button>
//       </div>
//     </div>
//   );
// }
"use client";

import { Button } from '@/components/ui/button';

export default function ContentCard({ data, onDelete, onEdit }) {
  return (
<<<<<<< HEAD
    <div className="bg-white p-4 rounded-xl shadow space-y-2">
      <img src={data.img} className="w-full h-48 object-cover rounded" alt={data.name} />
=======
    <div className="bg-white p-4 rounded-xl shadow space-y-2" >
      <img src={data.img} className="w-full h-48 object-cover rounded" /> 
>>>>>>> 4a9e367eb0b3542ccaa2048cdd9eb513e4f74a4b
      <h2 className="text-lg font-bold">{data.name}</h2>
      <p>⭐ {data.imdbRating} | 🎬 {data.type}</p>
      <div className="flex gap-2">
        <Button onClick={() => onEdit(data)}>✏️ Edit</Button>
        <Button variant="destructive" onClick={() => onDelete(data.slug || data._id)}>🗑️ Delete</Button>
      </div>
    </div>
  );
}