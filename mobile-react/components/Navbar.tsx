import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Navbar() {  
  const [token, setToken] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('token'); // Substituindo localStorage
      setToken(storedToken || '');
    };

    getToken();
  }, []);

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

          {/* Botões */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              /*onPress={() => navigation.navigate('Home')}*/
              >
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              /*onPress={() => navigation.navigate('CreatePost')}*/
              >
              <Text style={styles.buttonText}>Novo Post</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                await AsyncStorage.removeItem('token');
              }}>
              <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.navbar}>
        <View style={styles.navContent}>
          {/* Logo */}{/*
          <TouchableOpacity 
          onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.logo}>
              LEARN<Text style={styles.highlight}>ON</Text>
            </Text>
          </TouchableOpacity>*/}

           {/* Logo */}
           <Link href="/"
            >
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
    position: "absolute", // Fixa no topo da tela
    top: 0, // Posiciona no topo
    width: "100%",
    height: 90,
    backgroundColor: "#5340C6",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    zIndex: 1000, // Garante que fique sobre outros componentes
    elevation: 5, // Sombra no Android
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