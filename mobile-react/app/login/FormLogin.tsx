import Navbar from "@/components/Navbar";
import { login } from "@/repository/auth";
import { getUserInfo } from "@/repository/user";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function LoginForm(): JSX.Element {
  const [userType, setUserType] = useState<"aluno" | "professor">("aluno");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    console.log({ userType, email, password });

    try {
      await login(email, password);

      localStorage.setItem('user', JSON.stringify(await getUserInfo()));

      console.log('----------');
      console.log(localStorage);
      console.log('----------');

    } catch (error) {
      if (error instanceof Error) {
        console.log('----------');
        console.log('-->Erro<--');
        console.log(error.message)
        console.log('----------');

        setError(error.message);
      } else {
        console.log('----------');
        console.log('-->Erro<--');
        console.log(error)
        console.log('----------');
        setError("An unknown error occurred");
      }
    }


  };

  return (
    <View style={styles.container}>
      <Navbar></Navbar>
      <View>
          <Text style={styles.title}>LOGIN</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* User Type Selection */}
          {/*
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={[styles.radioOption, userType === "aluno" && styles.radioSelected]}
              onPress={() => setUserType("aluno")}
            >
              <Text style={styles.radioText}>aluno</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioOption, userType === "professor" && styles.radioSelected]}
              onPress={() => setUserType("professor")}
            >
              <Text style={styles.radioText}>professor</Text>
            </TouchableOpacity>
          </View>
            */}
          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>username</Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>password</Text>
            <TextInput
              style={styles.input}
              placeholder="********"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#E9D8FD", // Purple-200
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6B46C1", // Purple-800
    marginBottom: 20,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  radioOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#FAF5FF", // Purple-100
    borderWidth: 1,
    borderColor: "#D6BCFA", // Purple-300
  },
  radioSelected: {
    backgroundColor: "#6B46C1", // Purple-800
    borderColor: "#4C51BF", // Purple-600
  },
  radioText: {
    color: "#6B46C1", // Purple-800
    fontWeight: "bold",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#6B46C1", // Purple-800
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    backgroundColor: "#FAF5FF", // Purple-100
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D6BCFA", // Purple-300
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#4C51BF", // Purple-600
  },
  button: {
    backgroundColor: "#6B46C1", // Purple-800
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText:{
    color: "red",
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
  }
});
