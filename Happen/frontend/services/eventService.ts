import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.252.247:3001/api/eventos';

export const criarEvento = async (nome: string, descricao: string, local: string, data_hora: string, id_organizador: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(`${API_URL}/criarEvento`, { nome, descricao, local, data_hora, id_organizador },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao criar evento');
    }
  };