import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import PostCard from './PostCard'; // Certifique-se de que PostCard foi adaptado para React Native
import { Post } from '../types/Post';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decodificar } from '@/util/utilJwt';


interface SearchProps {
  posts: Post[];
  onDelete: (id: string) => void; // Adicionando a propriedade onDelete
}

export default function Search({ posts, onDelete } : SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [token, setToken] = useState("");

  useEffect(() => {
    // Obter token do armazenamento local
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setToken(token || "");
      } catch (error) {
        console.error("Erro ao obter token:", error);
      }
    };
    fetchToken();
  }, []);


  // Filtrando as postagens com base no termo de busca
  const filteredPosts = posts.filter((post : any) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const perfil = decodificar(token);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Buscar postagens</Text>
      <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Título ou conteúdo de um post"
            placeholderTextColor="#888"
            value={searchTerm}
            onChangeText={setSearchTerm} // Atualiza o valor da busca
          />
          {token && (perfil.r=='admin')? (
              <TouchableOpacity
                style={styles.readMoreButton}
                onPress={() => router.replace('/posts/create/page')}
                >
                <Text style={styles.readMoreText}>Novo Post</Text>

              </TouchableOpacity>
              ): null
          }
      </View>
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
  inputContainer: {
    flexDirection: 'row', // Coloca os elementos em linha (horizontal)
    justifyContent: 'space-between', // Espaça entre os componentes
    alignItems: 'center', // Alinha os itens verticalmente no centro
  },
  listItem: {
    marginBottom: 8,
  },readMoreButton: {
    backgroundColor: "#5340C6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  readMoreText: {
    color: "#FFF",
    fontSize: 14,
  },
});
