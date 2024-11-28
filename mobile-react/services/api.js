import axios from 'axios';

// Criação de uma instância do axios
const api = axios.create({
  baseURL: 'https://api.capoteimeu.uno/', // Coloque a URL base da sua API aqui
  timeout: 5000, // Timeout da requisição em 5 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicionar interceptador de resposta
api.interceptors.response.use(
  response => response,
  error => {
    // Aqui você pode tratar erros globais, como exibição de mensagens
    console.error('Erro de requisição:', error);
    return Promise.reject(error);
  }
);

export default api;
