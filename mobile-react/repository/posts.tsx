import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post, PostForm } from '../types/Post';
import { UsuarioForm } from '@/types/Usuario';

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch('https://api.capoteimeu.uno/posts');
    const posts = await response.json();

    return posts.data;
  } catch (error) {
    console.error("Erro ao buscar posts:", error); 
    return [];
  }
}

export async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://api.capoteimeu.uno/posts/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function createPost(title: string, content: string, author: string, publish: boolean): Promise<void> {
  const token = await AsyncStorage.getItem('token'); // Obtém o token do AsyncStorage
  await fetch('https://api.capoteimeu.uno/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Usa o token no cabeçalho
    },
    body: JSON.stringify({ title, content, author, publish }),
  });
}



export async function deletePost(id: string): Promise<void> {
  const token = await AsyncStorage.getItem('token'); // Obtém o token do AsyncStorage
  await fetch(`https://api.capoteimeu.uno/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`, // Usa o token no cabeçalho
    },
  });
}


export async function updatePost(id: string, post: PostForm): Promise<void> {
  const token = await AsyncStorage.getItem('token'); // Obtém o token do AsyncStorage
  await fetch(`https://api.capoteimeu.uno/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Usa o token no cabeçalho
    },
    body: JSON.stringify(post),
  });
}

export async function searchPosts(query: string): Promise<Post[]> {
  const res = await fetch(`https://api.capoteimeu.uno/posts/search?query=${query}`);
  const { data } = await res.json();

  return data;
}
