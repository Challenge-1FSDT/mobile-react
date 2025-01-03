import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para armazenar o token
import { updatePost, getPost } from '../../../repository/posts';
import { router, useLocalSearchParams } from "expo-router";
import Navbar from '@/components/Navbar';

export default function EditPostPage() {
  const params: { id: string } = useLocalSearchParams();
  const { id } = params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPost(id);
        setTitle(post.title);
        setContent(post.content);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdatePost = async () => {
    console.log(' >>> Salvar atualização <<<');
    try {
      const token = await AsyncStorage.getItem("token"); // Obtém o token do AsyncStorage
      if (token) {
        await updatePost(id, { title, content });
        Alert.alert("Sucesso", "Informações do aluno atualizado com sucesso", [
          { text: "OK", onPress: () => router.replace('/') }, // Navega para a tela inicial
        ]);
      } else {
        throw new Error("Token not found");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro");
      Alert.alert("Erro", error instanceof Error ? error.message : "Ocorreu um erro desconhecido");
    }
  };

  return (
    <View>
    <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.content}>
          <Text style={styles.title}>Editar post</Text>

          {error && <Text style={styles.error}>{error}</Text>}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Título</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Título"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Conteúdo</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={content}
              onChangeText={setContent}
              placeholder="Conteúdo"
              multiline
            />
          </View>

          <Button title="Publicar atualização" onPress={handleUpdatePost} color="#5340C6" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Garante que o conteúdo ocupe o espaço disponível
    padding: 20,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4C6EF5',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4C6EF5',
  },
  input: {
    height: 40,
    borderColor: '#4C6EF5',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginTop: 5,
  },
  textArea: {
    height: 150,
  },
});
