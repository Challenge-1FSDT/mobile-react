import { View, Text, StyleSheet } from "react-native";
import { Stack, Tabs } from  "expo-router";

export default function RootLayout(){
    return (
        <Tabs> 
            <Tabs.Screen name="index" />
            <Tabs.Screen name="userNomeComposto" options={{headerTitle: "User"}}/>
            <Tabs.Screen name="usuario/[usuarioId]"/>
        </Tabs>
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