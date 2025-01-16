import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3001/api/eventos';


const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('token');
};

export const criarEvento = async ( nome: string,descricao: string,local: string,data_hora: string,id_organizador: number) => {
  try {
    const token = await getToken();
    if (!token) throw new Error('Token não encontrado');
    const eventoData = { nome, descricao, local, data_hora, id_organizador };

    const response = await axios.post(`${API_URL}/criarEvento`,eventoData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
   
    console.error('Erro detalhado:', error);
    if (error.response) {
      
      console.error('Erro do servidor:', error.response.data);
    }
    throw new Error(error.response?.data?.message || 'Erro ao criar evento');
  }
};


export const obterEvento = async (id: number) => {
  try {
    const token = await getToken();
    if (!token) throw new Error('Token não encontrado');
    
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro ao obter evento:", error); 
    throw new Error(error.response?.data?.message || 'Erro ao obter evento');
  }
};


export const listarEventos = async (nome?: string,data_inicial?: string,data_final?: string) => {
  try {
    const token = await getToken();
    if (!token) throw new Error('Token não encontrado');

    const params: Record<string, string> = {};
    if (nome) params.nome = nome;
    if (data_inicial) params.data_inicial = data_inicial;
    if (data_final) params.data_final = data_final;

    const response = await axios.get(`${API_URL}/listarEventos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response.data.eventos;
  } catch (error: any) {
    console.error("Erro ao listar eventos:", error); 
    throw new Error(error.response?.data?.message || 'Erro ao listar eventos');
  }
};


export const excluirEvento = async (id: number) => {
  try {
    const token = await getToken();
    if (!token) throw new Error('Token não encontrado');
    
    const response = await axios.delete(`${API_URL}/excluirEvento/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro ao excluir evento:", error); 
    throw new Error(error.response?.data?.message || 'Erro ao excluir evento');
  }
};
