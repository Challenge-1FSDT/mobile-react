import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from '@fortawesome/fontawesome-svg-core'; // Usando FontAwesome para ícones
//import { deletePost } from '../lib/posts';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Definindo os tipos para as props do componente
interface PostCardProps {
  id: string;
  title: string;
  description: string;
  author: string;
  onDelete: (id: string) => void;
}


export default function PostCard({
  id,
  title,
  description,
  author,
  onDelete,
}: PostCardProps) {
  const [token, setToken] = useState("");
  const router = useRouter();

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

  const handleEdit = () => {
    //router.push(`posts/edit/${id}`);
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja deletar esse post?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            //await deletePost(id);
            //onDelete(id);
            Alert.alert("Sucesso", "Post deletado com sucesso!");
          },
        },
      ]
    );
  };

  const handleReadMore = () => {
    //router.push(`/posts/${id}`);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.author}>Autor: {author}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.actions}>
        {token ? (
          <View style={styles.editDeleteContainer}>
            <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
              <Icon name="edit" size={16} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
              <Icon name="trash" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
        ) : null}
        <TouchableOpacity onPress={handleReadMore} style={styles.readMoreButton}>
          <Text style={styles.readMoreText}>Leia mais</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#C4BEE9",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 16,
    elevation: 5, // Sombra no Android
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: "#5340C6",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editDeleteContainer: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    backgroundColor: "#5340C6",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  readMoreButton: {
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
