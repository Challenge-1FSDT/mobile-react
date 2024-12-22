import { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { getUsuarios } from "../../repository/Usuario";
import { Usuario } from "../../types/Usuario";
import SearchAluno from "../../components/SearchAluno";
import Navbar from "@/components/Navbar";

export default function Alunos() {
  const [alunos, setAluno] = useState<Usuario[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsuarios('user');

      console.log('>>> data >>> ' + data);

      setAluno(Array.isArray(data) ? data : []);
    };

    fetchData();
  }, []);

  const contexto = 'aluno';

  /*
  const handleDeleteAluno = (id: string) => {
    Alert.alert(
      "Tem certeza que deseja deletar este post?",
      "",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          onPress: () => {
            setAluno((prevAluno) => prevAluno.filter((aluno) => aluno.id !== id));
            Alert.alert("Usuário deletado com sucesso");
          },
        },
      ]
    );

  };
  */

  return (
    <View style={styles.container}>
    <Navbar></Navbar>
    <SearchAluno alunos={alunos} contexto={contexto} />
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
