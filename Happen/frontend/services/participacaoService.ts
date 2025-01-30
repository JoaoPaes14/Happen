import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


 const API_URL = 'http://localhost:3001/api/participacoes';

 export const criarParticipacao = async (id_evento: number, id_usuario: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(`${API_URL}/participacao`, {
        id_evento,
        id_usuario,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao criar participação');
    }
  };
  
  export const listarParticipacoes = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_URL}/participacoes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao listar participações');
    }
  };