import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';

const API_URL = 'http://localhost:3001/api/eventos'; 

const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('token');
};


export const handleImagePicker = async (): Promise<string | undefined> => {
  try {
    const result: ImagePickerResponse = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });

    if (result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      console.log('Imagem selecionada:', imageUri);
      return imageUri;
    } else {
      console.log('Nenhuma imagem selecionada');
      return undefined;
    }
  } catch (error) {
    console.error('Erro ao selecionar imagem:', error);
    return undefined;
  }
};


export const criarEvento = async ( nome: string,descricao: string,local: string,data_hora: string,id_organizador: number,imagemUri?: string) => {
  try {
    const token = await getToken();
    if (!token) throw new Error('Token não encontrado');

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('local', local);
    formData.append('data_hora', data_hora);
    formData.append('id_organizador', id_organizador.toString());

    if (imagemUri) {
      const image = await fetch(imagemUri)
        .then((res) => res.blob())
        .then((blob) => {
          return new File([blob], 'imagem.jpg', { type: 'image/jpeg' });
        })
        .catch(() => {
          throw new Error('Erro ao converter a imagem para Blob');
        });

      formData.append('imagem', image);
    }

    const response = await axios.post(`${API_URL}/criarEvento`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Erro ao criar evento:', error);
    throw new Error(error.response?.data?.message || 'Erro ao criar evento');
  }
};

// Obter Evento por ID
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
    console.error('Erro ao obter evento:', error);
    throw new Error(error.response?.data?.message || 'Erro ao obter evento');
  }
};

// Listar Eventos
export const listarEventos = async () => {
  try {
    const response = await axios.get(`${API_URL}/listarEventos`);
    return response.data.eventos;
  } catch (error) {
    console.error("Erro ao listar eventos:", error);
    throw new Error("Erro ao listar eventos");
  }
};

// Excluir Evento
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
    console.error('Erro ao excluir evento:', error);
    throw new Error(error.response?.data?.message || 'Erro ao excluir evento');
  }
};
