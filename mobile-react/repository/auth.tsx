import { User } from '../types/User';

import base64, { encode, decode } from 'react-native-base64';

export const user: User | null = null;

export async function login(email: string, password: string): Promise<void> {
    //const encodedHeader = Buffer.from(`${email}:${password}`).toString("base64");

    const encodedHeader = base64.encode(`${email}:${password}`);

    const response = await fetch("https://api.capoteimeu.uno/auth/login", {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedHeader}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.text();
    localStorage.setItem("token", data);
    
    if (response.ok) {
      window.location.href = "/";
    } else {
      throw new Error("Credenciais inválidas. Tente novamente.");
    }
}