import AsyncStorage from '@react-native-async-storage/async-storage';
import { Aluno, PostForm } from '../types/Aluno';

export async function getAlunos(): Promise<Aluno[]> {
  try {
    const response = await fetch('https://api.capoteimeu.uno/users');
    const alunos = await response.json();

    return alunos.data;
  } catch (error) {
    console.error("Erro ao buscar alunos:", error); 
    return [];
  }
}
