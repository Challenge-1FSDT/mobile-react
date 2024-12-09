import { User } from '../types/User';
import base64 from "react-native-base64";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function login(email: string, password: string): Promise<void> {

  console.log('-----------------------');

  console.log(' >> Email: '+email);
  console.log(' >> Password: '+password);

  console.log('-----------------------');

  const encodedHeader = base64.encode(`${email}:${password}`);

  const response = await fetch("https://api.capoteimeu.uno/auth/login", {
    method: "POST",
    headers: {
      Authorization: `Basic ${encodedHeader}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.text();

  console.log('-----------------');
  console.log('>>> auth: ' + data);
  console.log('-----------------');

  if (response.ok) {
    try {

      // Armazena o token no AsyncStorage
      await AsyncStorage.setItem("token", data);
      console.log('token guardado: ' + data);
      console.log('-----------------');
    } catch (error) {
      //throw new Error("Erro ao salvar o token: " + error.message);
      if (error instanceof Error) {
        throw new Error("Erro ao salvar o token: " + error.message);
      } else {
        throw new Error("Erro ao salvar o token: tipo de erro desconhecido.");
      }
    }
  } else {
    throw new Error("Credenciais inválidas. Tente novamente.");
  }
}


export async function verificaToken(token: string){
  
}