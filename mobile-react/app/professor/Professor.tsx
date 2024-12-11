import { useEffect, useState } from "react";
import { View, StyleSheet} from "react-native";
import { Usuario } from "../../types/Usuario";
import SearchProfessor from "../../components/SearchProfessor";
import Navbar from "@/components/Navbar";
import { getUsuarios } from "@/repository/Usuario";

export default function Professor() {
  const [professores, setProfessor] = useState<Usuario[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsuarios('admin');
      setProfessor(Array.isArray(data) ? data : []);
    };

    fetchData();
  }, []);

  const contexto = 'professor';

  return (
    <View style={styles.container}>
      <Navbar></Navbar>
      <SearchProfessor professores={professores} contexto={contexto} />
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
