// Search.tsx
'use client';

import { useState } from "react";
import { Post } from "../types/Post";
import PostCard from "./PostCard";

interface SearchProps {
  posts: Post[];
  onDelete: (id: string) => void; // Adicionando a propriedade onDelete
}

export default function Search({ posts, onDelete }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className='p-4'>
      <h2 className='text-indigo-950 text-xl font-bold text-center mb-2'>Buscar postagens</h2>
      <input
        type='text'
        placeholder='Título ou conteúdo de um post'
        className='border border-indigo-900 p-2 w-full rounded-md text-black'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className='px-4 text-indigo-900 mt-6 overflow-y-auto h-[570px]'>
        {posts
          .filter((post: Post) => 
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((post: Post) => (
            <li key={post.id} className='p-2'>
              <PostCard 
                id={post.id} 
                title={post.title} 
                description={post.content} 
                author={post.author} 
                onDelete={onDelete} 
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
