import { useEffect, useState } from "react";
import Search from "../../components/SearchPost";
import { getPosts } from "../../repository/posts";
import { Post } from "../../types/Post";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();
      setPosts(data);
    };

    fetchData();
  }, []);

  const handleDeletePost = (id: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return (
    <div>
      <h1 className='text-indigo-950 text-2xl p-4 font-bold'>Posts</h1>
      <Search posts={posts}  onDelete={handleDeletePost} />
    </div>
  );
}
