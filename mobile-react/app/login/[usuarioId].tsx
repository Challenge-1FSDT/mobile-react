import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function UsuarioPage(){

    const { usuarioId } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text>Usuario ID: {usuarioId}</Text>
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