import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api/usuarios';


export const login = async (email: string, senha: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, senha });

    if (response.data.token) {
      
      await AsyncStorage.setItem('token', response.data.token);
    }

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao fazer login');
  }
};


export const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
};

