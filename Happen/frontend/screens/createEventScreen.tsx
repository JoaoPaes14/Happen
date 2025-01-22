import {  Dimensions,  Alert, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, View, StyleSheet, Text, Image } from "react-native";
import React, { useState } from "react";
import { criarEvento } from "../services/eventService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

const CreateEventScreen = ({ navigation }: any) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [local, setLocal] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [imagem, setImagem] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateEvent = async () => {
    if (!nome || !descricao || !local || !dataHora) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Erro', 'Você precisa estar logado para criar um evento');
        return;
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      const idOrganizador = decodedToken.id;

      const response = await criarEvento(nome, descricao, local, dataHora, idOrganizador, imagem);
      if (response) {
        Alert.alert('Sucesso', 'Evento criado com sucesso!');
        navigation.navigate('EventListScreen');
      }
    } catch (error: any) {
      Alert.alert('Erro', error?.message || 'Erro ao criar evento');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0]); 
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.logoContainer}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Evento"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
        />
        <TextInput
          style={styles.input}
          placeholder="Local"
          value={local}
          onChangeText={setLocal}
        />
        <TextInput
          style={styles.input}
          placeholder="Data e Hora (ex: 2025-01-14 18:00)"
          value={dataHora}
          onChangeText={setDataHora}
        />

        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>
            {imagem ? 'Alterar Imagem' : 'SELECIONAR IMAGEM'}
          </Text>
        </TouchableOpacity>

        {imagem && (
          <Image source={{ uri: imagem.uri }} style={styles.imagePreview} />
        )}

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateEvent}
          disabled={loading}
        >
          <Text style={styles.createButtonText}>{loading ? 'Criando...' : 'CRIAR EVENTO'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#BFFFC5', 
  },
  formContainer: {
    backgroundColor: '#4CAF50',
    marginHorizontal: width * 0.05,
    padding: 20,
    borderRadius: 20,
    elevation: 4,
  },
  input: {
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  imageButton: {
    borderWidth: 1,
    borderColor: '#006229',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#BFFFC5',
  },
  imageButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  createButton: {
    borderWidth: 1,
    borderColor: '#006229',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#BFFFC5',
  },
  createButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: width * 3.6,
    height: height * 0.3,
  }
});

export default CreateEventScreen;
