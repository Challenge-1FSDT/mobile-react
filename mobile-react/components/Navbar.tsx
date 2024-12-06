import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from "expo-router";

export default function Navbar() {  
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('token'); // Substituindo localStorage
      setToken(storedToken || '');
    };

    getToken();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token'); // Remove o token do AsyncStorage
    router.replace('/');
  }

  if (token) {
    return (
      <View style={styles.navbar}>
        <View style={styles.navContent}>
          {/* Logo */}
          <Link href="/"
            >
            <Text style={styles.logo}>
              LEARN<Text style={styles.highlight}>ON</Text>
            </Text>
          </Link>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* Botões */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace('/')}
                >
                <Text style={styles.buttonText}>Posts</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.button} 
                onPress={() => router.replace('/aluno/Alunos')}
                >
                <Text style={styles.buttonText}>Alunos</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => router.navigate('/aluno/Professor')}
                >
                <Text style={styles.buttonText}>Professores</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>



        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.navbar}>
        <View style={styles.navContent}>
          {/* Logo */}

           {/* Logo */}
           <Link href="/">
            <Text style={styles.logo}>
              LEARN<Text style={styles.highlight}>ON</Text>
            </Text>
          </Link>

          {/* Botão de Login */}
          <Link href="/login/FormLogin" style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
          </Link>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    width: "100%",
    height: 90, // altura da navbar
    backgroundColor: "#5340C6",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    zIndex: 1000, // para garantir que a navbar fique acima de outros componentes
    elevation: 5, // sombra no Android
    position: "relative", // removendo a posição absoluta para evitar sobreposição
  },
  navContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2A2379",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: 16,
  },
  logo: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  highlight: {
    color: "#4C51BF",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  buttonText: {
    color: "#5340C6",
    fontWeight: "bold",
  },
});
