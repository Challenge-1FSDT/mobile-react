import { View, Text, StyleSheet } from "react-native";
import { Stack, Tabs } from  "expo-router";

export default function RootLayout(){
    return (
        <Stack> 
            <Stack.Screen name="index" />
            <Stack.Screen name="userNomeComposto" options={{headerTitle: "User"}}/>
            <Stack.Screen name="usuario/[usuarioId]"/>
        </Stack>
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