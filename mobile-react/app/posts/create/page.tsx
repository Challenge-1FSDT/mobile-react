import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, TextInput } from 'react-native';
import Navbar from '../../../components/Navbar';
import { getPost } from '../../../repository/posts';
import { router } from "expo-router";

import { createPost } from '../../../repository/posts'; // Certifique-se de que createPost está configurado para React Native
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { extractUserName } from '@/repository/user';


export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const handleCreatePost = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token");

      if (token) {
        const author = extractUserName(token); // Ajuste conforme necessário
        console.log(author);
      } else {
        throw new Error("Token not found");
      }

      console.log(user);

      const author = "Anelise Estevam";
      const publish = true;

      await createPost(title, content, author, publish);

      // Navega para a tela inicial após publicar o post
      //navigation.navigate("Home"); // Certifique-se de que a rota "Home" existe no seu navigator
      router.replace('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      /*
      } else {
        setError("An unknown error occurred");
      }
      Alert.alert("Erro", error.message || "Ocorreu um erro desconhecido");
      */
        Alert.alert("Erro", error.message || "Ocorreu um erro desconhecido");
      } else {
        setError("An unknown error occurred");
        Alert.alert("Erro", "Ocorreu um erro desconhecido");
      }

    }
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.title}>Criar post</Text>
      
      {error && (
        <TouchableOpacity onPress={() => router.replace('/login/FormLogin')}>
          <Text style={styles.errorText}>
            Usuário não autenticado, clique para fazer login
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.form}>
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

        <TouchableOpacity style={styles.button} onPress={handleCreatePost}>
          <Text style={styles.buttonText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4C6EF5',
    marginVertical: 12,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  },
  form: {
    backgroundColor: '#EAEAEA',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4C6EF5',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  textArea: {
    height: 200,
  },
  button: {
    backgroundColor: '#4C6EF5',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
