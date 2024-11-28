import { View, Text, StyleSheet, Button } from "react-native";
import { Link, router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import Navbar from "@/components/Navbar";

export default function HomePage(){

    function irParaUsuarioId(){
        const variavel = "abcdef123";
        router.push(`/login/${variavel}`);
    }


    return (
        <View style={styles.container}>
            <Navbar></Navbar>
            <Link href="/userNomeComposto">  Ir para userNomeComposto</Link>
            <Link href="/login/123456789abcde"> Ir para Usuario</Link>
            <Button title="Go to random usuario" onPress={irParaUsuarioId}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "lightblue",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})