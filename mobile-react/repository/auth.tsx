import { User } from '../types/User';

export const user: User | null = null;

export async function login(email: string, password: string): Promise<void> {
    const encodedHeader = Buffer.from(`${email}:${password}`).toString("base64");

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