import JWT from 'expo-jwt';

const secretKey = "eir"; // Certifique-se de que é a mesma chave usada no backend

export function decodeJWT(token: string): Record<string, any> | null {
  console.log("***************");
  console.log("Token:", token);
  try {
    const decoded = JWT.decode(token, secretKey, {
      algorithms: ["HS256"], // Certifique-se de usar o algoritmo correto
    });
    console.log("Decoded Data:", decoded);
    console.log("***************");
    return decoded as Record<string, any>;
  } catch (error) {
    console.error("Erro ao decodificar o JWT:", error);
    console.log("***************");
    return null;
  }
}

// Exemplo de uso
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpIjoiNmMxM2YwMjktODYzOS00ZWJiLWFjYmMtMWM0NDkxYzY1Y2U2IiwiZSI6InByb2Zlc3NvckBmaWFwLmNvbSIsInIiOiJhZG1pbiIsImlhdCI6MTczMzg4NjcxMCwiZXhwIjoxNzMzOTczMTEwfQ.1ul92ti6jXxn8rhsGQbnmpMi9NJl0FRgNLBxns2UuGk";

const decodedData = decodeJWT(token);
console.log("decodedData >>", decodedData);