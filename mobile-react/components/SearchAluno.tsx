import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AlunoCard from './UsuarioCard'; // Certifique-se de que PostCard foi adaptado para React Native
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario } from '@/types/Usuario';
import UsuarioCard from './UsuarioCard';


interface SearchProps {
  alunos: Usuario[];
  contexto: string; // Adicionando a propriedade onDelete
}

export default function SearchAluno({ alunos, contexto } : SearchProps) {
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
    console.log('Usuario >> ' + alunos);
    fetchToken();
  }, []);

  
  // Filtrando as postagens com base no termo de busca
  const filteredAlunos = alunos.filter((aluno : any) =>
    aluno.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.email.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Buscar Aluno</Text>
      <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Informação do Aluno"
            placeholderTextColor="#888"
            value={searchTerm}
            onChangeText={setSearchTerm} // Atualiza o valor da busca
          />
          {token ? (

              /**/
              <TouchableOpacity
                style={styles.readMoreButton}
                onPress={() => router.replace('/aluno/create/page')}>
                <Text style={styles.readMoreText}>Novo Aluno</Text>

              </TouchableOpacity>
              ): null
          }
      </View>
      <FlatList
        data={filteredAlunos}
        keyExtractor={(item) => item.id.toString()} // Certifique-se de que o ID é uma string
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <UsuarioCard
              id={item.id}
              name={item.name}
              email={item.email}
              password={item.password}
              role={item.role}
              contextoCard={contexto}
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
