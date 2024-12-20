import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario, UsuarioForm } from '../types/Usuario';

export async function getUsuario(id: string): Promise<Usuario> {

  try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`https://api.capoteimeu.uno/users/${id}`,
          {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Usa o token no cabeçalho
            },
          }
      );

      console.log('(status): '+ res.status);
      console.log('(Header): '+res.headers);
      console.log('(Body): '+res.body);

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      return res.json();

  } catch (error) {
    console.error("Erro ao buscar alunos:", error); 
  }
}


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

  console.log('-------------------------');

  console.log('--------------------------');
  console.log(' <<< updateUsuario >>> ');

  console.log(' >>> Body: ', JSON.stringify(post));

  console.log('--------------------------');

  const token = await AsyncStorage.getItem('token'); // Obtém o token do AsyncStorage
  await fetch(`https://api.capoteimeu.uno/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Usa o token no cabeçalho
    },
    body: JSON.stringify( post ),
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

export async function createUsuario(
  name: string,
  email: string,
  password: string,
  role: string
): Promise<string> {
  console.log('=========================');
  console.log(`nome: ${name}, email: ${email}, senha: ${password}, role: ${role}`);
  console.log('=========================');

  const token = await AsyncStorage.getItem('token'); // Obtém o token do AsyncStorage

  try {
      const teste = JSON.stringify({ name, email, password, role });

      console.log('****************************');
      console.log('>>> Teste <<<');
      console.log(teste); // Mostra o JSON formatado
      console.log('****************************');

      const response = await fetch('https://api.capoteimeu.uno/users', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Usa o token no cabeçalho
          },
          body: teste,
      });

      console.log('Status da resposta:', response.status);

      // Tratar status 201 (criado com sucesso)
      if (response.status === 201) {
          console.log("Usuário criado com sucesso. Nenhum corpo de resposta esperado.");
          return 'Usuário criado com sucesso!';
      }

      // Tratar outros status e verificar se há um corpo JSON
      const contentType = response.headers.get('Content-Type');
      if (contentType?.includes('application/json')) {
          const responseBody = await response.json();
          console.log("Resposta da API:", responseBody);

          if (!response.ok) {
              const errorMessages = responseBody.message || 'Erro desconhecido';
              throw new Error(Array.isArray(errorMessages) ? errorMessages.join(', ') : errorMessages);
          }

          return 'Usuário criado com sucesso!';
      } else {
          const rawResponse = await response.text();
          console.error("Resposta inesperada da API:", rawResponse);
          throw new Error(`Resposta inesperada. Status: ${response.status}`);
      }
  } catch (error) {
      console.log('Erro ao criar usuário: ', error);
      throw error instanceof Error ? error : new Error('Erro desconhecido ao criar o usuário.');
  }
}
