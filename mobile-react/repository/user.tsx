import { User } from "../types/User";
import { Buffer } from "buffer"; // Importa o Buffer do pacote

import AsyncStorage from "@react-native-async-storage/async-storage";

// Decodifica o token JWT e extrai o nome do usuário
export function extractUserName(token: string): string {
  const [, payload] = token.split(".");
  const decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
  const { username } = JSON.parse(decodedPayload);
  return username;
}

// Obtém as informações do usuário do token armazenado
export async function getUserInfo(): Promise<User> {
  // Usa AsyncStorage para buscar o token
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }

  // Decodifica o payload do token JWT
  const [, payload] = token.split(".");
  const decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
  const { id, name, email, role } = JSON.parse(decodedPayload);

  // Retorna o usuário com base nas informações do token
  return { id, name, email, role };
}
