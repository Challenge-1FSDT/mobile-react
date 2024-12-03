import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import Search from "../components/SearchPost";  // Certifique-se de que este componente está adaptado para React Native
import { getPosts } from "../repository/posts";  // Função para pegar os posts (assumindo que você tem essa função adaptada para React Native)
import { Post } from "../types/Post";  // Tipagem de Post (se você estiver usando TypeScript)
import Navbar from "@/components/Navbar";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();  // Supondo que essa função retorna os posts corretamente
      setPosts(data);
    };

    fetchData();
  }, []);

  const handleDeletePost = (id: string) => {

    Alert.alert(
      "Tem certeza que deseja deletar este post?",
      "",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          onPress: () => {
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
            Alert.alert("Post deletado com sucesso");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Navbar></Navbar>
      <Text style={styles.heading}>Posts</Text>
      <Search posts={posts} onDelete={handleDeletePost} />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "lightblue",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3f1f94",
    marginBottom: 16,
    textAlign: "center",
  },
});
