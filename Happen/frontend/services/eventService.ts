import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.252.247:3001/api/eventos';

const getToken = async (): Promise<string | null> => {
    return await AsyncStorage.getItem('token');
  };

  export const criarEvento = async (nome: string, descricao: string, local: string, data_hora: string, id_organizador: number) => {
    try {
      const token = await getToken();
      const response = await axios.post(`${API_URL}/criarEvento`,{ nome, descricao, local, data_hora, id_organizador },
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

  export const obterEvento = async(id:number)=>{
    try{
        const token = await getToken();
        const response = await axios.get(`${API_URL}/${id}`,{
            headers:{
                Authorization: `Bearrer ${token}`,
            },
        });
        return response.data;
    }catch(error:any){
        throw new Error(error.response?.data?.message || 'Erro ao obter evento');

    }
  };