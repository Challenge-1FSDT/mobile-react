import { User } from "../types/User";

export function extractUserName(token: string): string {
  const [, payload] = token.split(".");
  const decodedPayload = atob(payload);
  const { username } = JSON.parse(decodedPayload);
  return username;
}

export async function getUserInfo(): Promise<User> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }

  const encodedPayload = token.split(".")[1];
  const payload = Buffer.from(encodedPayload, "base64").toString();
  const { id, name, email, role } = JSON.parse(payload);

  return { id, name, email, role };
}