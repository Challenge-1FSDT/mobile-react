import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';
import Navbar from '../../../components/Navbar';
import { router } from "expo-router";

import { createUsuario } from '../../../repository/Usuario'; // Certifique-se de que createPost está configurado para React Native
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { extractUserName } from '@/repository/user';


export default function CreatePostPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleCreateAlunos = async () => {
   
      const token = await AsyncStorage.getItem("token");

      if (token) {
        const author = extractUserName(token); // Ajuste conforme necessário
        console.log(author);
      } else {
        Alert.alert('Sessão do Usuário está expirada, você será redirecionado para tela de login.');
        router.replace('/');
      }

    try {
      const response = await createUsuario(nome, email, senha, 'user');
      console.log(' >>> response >>> ' + response);
      Alert.alert('Sucesso', 'Usuário criado com sucesso!');
      // Navega para a tela inicial após criar o usuário
      router.replace('/aluno/Alunos');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Atualiza o estado do erro, se necessário
        Alert.alert('Erro', error.message); // Exibe a mensagem de erro
      } else {
        setError('Ocorreu um erro desconhecido.');
        Alert.alert('Erro', 'Ocorreu um erro desconhecido.');
      }
    }

  };

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.title}>Adicionar Novo Aluno</Text>
      
      {error && (
        <TouchableOpacity onPress={() => router.replace('/login/FormLogin')}>
          <Text style={styles.errorText}>
            Usuário não autenticado, clique para fazer login
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Nome"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="E-mail"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            placeholder="Senha"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCreateAlunos}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
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
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  radioOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#FAF5FF", // Purple-100
    borderWidth: 1,
    borderColor: "#D6BCFA", // Purple-300
  },
  radioSelected: {
    backgroundColor: "#6B46C1", // Purple-800
    borderColor: "#4C51BF", // Purple-600
  },
  radioText: {
    color: "#6B46C1", // Purple-800
    fontWeight: "bold",
  }
});
