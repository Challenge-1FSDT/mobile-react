import { View, Text, StyleSheet } from "react-native";
import { Stack, Tabs } from  "expo-router";

export default function RootLayout(){
    return (
        <Stack screenOptions={{ headerShown: false }}> 
            <Tabs.Screen name="index" />
            <Tabs.Screen name="posts" />
            <Tabs.Screen name="alunos" />
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