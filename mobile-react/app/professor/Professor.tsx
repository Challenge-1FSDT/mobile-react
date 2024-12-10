import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import Search from "../../components/SearchAluno";
import { getUsuario, getUsuarios } from "../../repository/Usuario";
import { Usuario } from "../../types/Usuario";
import SearchProfessor from "../../components/SearchProfessor";
import Navbar from "@/components/Navbar";

export default function Professor() {
  const [professores, setProfessor] = useState<Usuario[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsuarios('admin');
      setProfessor(Array.isArray(data) ? data : []);
    };

    fetchData();
  }, []);

  const handleDeleteAluno = (id: string) => {
    Alert.alert(
      "Tem certeza que deseja deletar este usuário?",
      "",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          onPress: () => {
            setProfessor((prevProfessor) => prevProfessor.filter((professor) => professor.id !== id));
            Alert.alert("Usuário deletado com sucesso");
          },
        },
      ]
    );

  };

  return (
    <View style={styles.container}>
    <Navbar></Navbar>
    <SearchProfessor professores={professores} onDelete={handleDeleteAluno} />
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
