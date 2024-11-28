'use client';

import { FC, useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { deletePost } from '../lib/posts';

interface PostCardProps {
  id: string;
  title: string;
  description: string;
  author: string;
  onDelete: (id: string) => void;
}

const PostCard: FC<PostCardProps> = ({ id, title, description, author, onDelete }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token ? token : "");
  }, []);

  const router = useRouter();

  const handleEdit = () => {
    router.push(`posts/edit/${id}`);
  };

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja deletar esse post?')) {
      await deletePost(id);
      onDelete(id); 
      alert('Post deletado com sucesso'); 
    } else {
      alert('Post não deletado');
    }
  };

  const handleReadMore = () => {
    router.push(`/posts/${id}`);
  };

  return (
    <div className="bg-[#C4BEE9] rounded-[20px] p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          {title}
        </h2>
      </div>
      <p className="text-md text-[#5340C6]">Autor: {author}</p>

      <p className="text-gray-700 mb-4">
        {description}
      </p>

      <div className='flex w-full justify-end'>
      {
          token ? (
            <div className="flex space-x-2 mr-2">
              <button
                onClick={handleEdit}
                className="bg-[#9789F0] text-white flex justify-center items-center w-[30px] h-[30px] rounded-[15px] hover:bg-[#7565dd] transition-colors"
              >
                <FaEdit />
              </button>
              <button
                onClick={handleDelete}
                className="bg-[#5340C6] text-white flex justify-center items-center w-[30px] h-[30px] rounded-[15px] hover:bg-[#100451] transition-colors"
              >
                <FaTrashAlt />
              </button>
            </div>
          ) : null
        }

        <button
          onClick={handleReadMore}
          className="bg-[#5340C6] text-white px-4 py-1 rounded-[20px] hover:bg-[#100451] transition-colors"
        >
          Leia mais
        </button>

      </div>
    </div>
  );
};

export default PostCard;
