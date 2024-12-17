import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para armazenar o token
import { router, useLocalSearchParams } from "expo-router";
import Navbar from '@/components/Navbar';
import { getUsuario, updateUsuario } from '@/repository/Usuario';

export default function EditPostPage() {
  const params: { id: string } = useLocalSearchParams();
  const { id } = params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const role = 'admin';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const usuario = await getUsuario(id);
        setName(usuario.name);
        setEmail(usuario.email);
        setPassword(usuario.password);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
        Alert.alert('Ocorre um erro de '+ (error instanceof Error ? error.message : "desconhecido"));
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdateUsuario = async () => {
    console.log(' >>> Salvar atualização <<<');
    try {
      const token = await AsyncStorage.getItem("token"); // Obtém o token do AsyncStorage
      if (token) {
        await updateUsuario(id, { name, email, password, role });
        Alert.alert("Sucesso", "Usuário atualizado com sucesso", [
          { text: "OK", onPress: () => router.replace('/professor/Professor') }, // Navega para a tela inicial
        ]);
      } else {
        throw new Error("Token not found");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      Alert.alert("Erro", error instanceof Error ? error.message : "Ocorreu um erro desconhecido");
    }
  };
  return (

    <View>
      <Navbar />
      <View style={styles.container}>
        
        <Text style={styles.title}>Alterar Informações do Professor</Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
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
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleUpdateUsuario}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Garante que o conteúdo ocupe o espaço disponível
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
  content: {
    flex: 1,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    height: 40,
    borderColor: '#5340C6',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginTop: 5,
  },
  textArea: {
    height: 150,
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
