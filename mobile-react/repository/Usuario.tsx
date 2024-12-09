import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario, UsuarioForm } from '../types/Usuario';



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

export async function deleteUsuario(id:string): Promise<void>{
  const token = await AsyncStorage.getItem('token'); // Obtém o token do AsyncStorage
  await fetch(`https://api.capoteimeu.uno/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`, // Usa o token no cabeçalho
    },
  });
}

export async function updateUsuario(id: string, post: UsuarioForm): Promise<void> {
  const token = await AsyncStorage.getItem('token'); // Obtém o token do AsyncStorage
  await fetch(`https://api.capoteimeu.uno/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Usa o token no cabeçalho
    },
    body: JSON.stringify(post),
  });
}

export async function searchUsuario(query: string): Promise<Usuario[]> {
  const res = await fetch(`https://api.capoteimeu.uno/users/search?query=${query}`);
  const { data } = await res.json();

  return data;
}


function traduzirMensagem(erro: string): string {
  const traducoes: { [chave: string]: string } = {
    "email must be an email": "O email está em formato inválido",
    "password is not strong enough": "A senha não é forte o suficiente",
  };
  return traducoes[erro] || erro; // Retorna a tradução ou o texto original, se não encontrado
}

export async function createUsuario(name: string,
                                    email: string, 
                                    password: string, 
                                    role: string): Promise<string> {

  console.log('=========================');
  console.log(`nome: ${name}, email: ${email}, senha: ${password}, role: ${role}`);
  console.log('=========================');

  const token = await AsyncStorage.getItem('token'); // Obtém o token do AsyncStorage

  try {

      const response = await fetch('https://api.capoteimeu.uno/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Usa o token no cabeçalho
        },
        body: JSON.stringify(
          {
            name, // Corrigido para "name"
            email,
            password, // Corrigido para "password"
            role,
          }
        ),
      });

      //const responseBody = await response.text();
      const responseBody = await response.json();
      console.log("createUsuario >> Resposta da API:", responseBody);

      if (!response.ok) {
        // Concatena as mensagens de erro (se existirem) ou usa um fallback genérico
        /*
        const errorMessage = responseBody.message
          ? responseBody.message.join(', ')
          : 'Erro desconhecido ao criar o usuário.';
        throw new Error(errorMessage); // Lança o erro com a mensagem apropriada
        */
        const mensagensTraduzidas = responseBody.message
              .map((msg: string) => traduzirMensagem(msg)) // Traduz cada mensagem
              .join(' e '); // Junta as mensagens em uma string
        throw new Error(mensagensTraduzidas); // Lança o erro com as mensagens traduzidas
      }
    
      return 'Usuário criado com sucesso!';
  } catch (error) {
    console.log('Erro ao criar usuário: ', error);
    // Repassa o erro para quem chamou a função
    throw error instanceof Error ? error : new Error('Erro desconhecido ao criar o usuário.');
  }

}

