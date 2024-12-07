import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario } from '../types/Usuario';

export async function getUsuarios(perfil : string): Promise<Usuario[]> {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('Token >> '+token+' << Token');
    const response = await fetch(`https://api.capoteimeu.uno/users?role=${perfil}`,
      {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Usa o token no cabeçalho
        },
      }
    );

    // Se a resposta for um JSON, o método `.json()` a converte
    const jsonResponse = await response.json();

    // Exibe o objeto inteiro no console de forma legível
    console.log('Resposta recebida (JSON):', JSON.stringify(jsonResponse, null, 2));

    // Retorna os dados (ou um array vazio, se não existir a propriedade 'data')
    return jsonResponse[0] || [];

  } catch (error) {
    console.error("Erro ao buscar alunos:", error); 
    return [];
  }
}
