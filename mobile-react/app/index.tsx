import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomePage(){
    return (
        <View style={styles.container}>
            <Text>Teste</Text>
            <Link href="/userNomeComposto">Ir para userNomeComposto</Link>
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