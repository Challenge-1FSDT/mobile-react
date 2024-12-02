import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import PostCard from './PostCard'; // Certifique-se de que PostCard foi adaptado para React Native
import { Post } from '../types/Post';


interface SearchProps {
  posts: Post[];
  onDelete: (id: string) => void; // Adicionando a propriedade onDelete
}

export default function Search({ posts, onDelete } : SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrando as postagens com base no termo de busca
  const filteredPosts = posts.filter((post : any) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Buscar postagens</Text>
      <TextInput
        style={styles.input}
        placeholder="Título ou conteúdo de um post"
        placeholderTextColor="#888"
        value={searchTerm}
        onChangeText={setSearchTerm} // Atualiza o valor da busca
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()} // Certifique-se de que o ID é uma string
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <PostCard
              id={item.id}
              title={item.title}
              description={item.content}
              author={item.author}
              onDelete={onDelete}
            />
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    color: '#3f1f94',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#3f1f94',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    color: '#000',
  },
  list: {
    paddingHorizontal: 8,
  },
  listItem: {
    marginBottom: 8,
  },
});
