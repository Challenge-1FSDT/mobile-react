import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Navbar from '../../../components/Navbar';
import { getPost } from '../../../repository/posts';

export default function PostPage({ route }: { route: { params: { id: string } } }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getPost(route.params.id);
      setPost(fetchedPost);
    };
    fetchPost();
  }, [route.params.id]);

  if (!post) {
    return <Text>Carregando...</Text>;
  }

  const date = new Date(post.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Navbar />
      <View style={styles.content}>
        <Text style={styles.title}>{post.title}</Text>
        <View style={styles.info}>
          <Text style={styles.author}>Author: {post.author}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.date}>Publicado em: {date}</Text>
        </View>
        <Text style={styles.contentText}>{post.content}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  info: {
    marginTop: 8,
  },
  author: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '600',
  },
  date: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '600',
  },
  contentText: {
    marginTop: 16,
    fontSize: 16,
    color: 'gray',
    textAlign: 'justify',
  },
});