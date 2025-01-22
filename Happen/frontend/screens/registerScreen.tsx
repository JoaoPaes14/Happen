import { Dimensions, Alert, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, View, StyleSheet, Text, Image } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { register } from "../services/authService";
import { validarEmail, validarSenha } from "../utils/validators";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const RegisterScreen = ({ navigation }: any) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('comum');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome) {
      Alert.alert('Erro', 'O nome é obrigatório');
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert('Erro', 'Formato de email inválido');
      return;
    }

    if (!validarSenha(senha)) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const response = await register(nome, email, senha, tipo);
      if (response.token) {
        await AsyncStorage.setItem('token', response.token);
        Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
        navigation.navigate('Login');
      }
    } catch (error: any) {
      Alert.alert('Erro', error?.message || 'Erro ao fazer Cadastro');
    } finally {
      setLoading(false);
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
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Tipo de Usuário:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={tipo}
              onValueChange={(itemValue) => setTipo(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Comum" value="comum" />
              <Picker.Item label="Organizador" value="organizador" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.registerButtonText}>REGISTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.backToLoginButton}
        >
          <Text style={styles.backToLoginText}>Já possui conta? Faça login</Text>
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
  pickerContainer: {
    marginBottom: 20,
    
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#000',
  },
  pickerWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 10,
    fontSize: 10,
  },
  picker: {
    height: 50,
    color: '#333',
    
  },
  registerButton: {
    borderWidth: 1,
    borderColor: '#006229',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#BFFFC5',
  },
  registerButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  backToLoginButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backToLoginText: {
    color: '#000',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: width * 3.6,
    height: height * 0.3,
  },
  pickerItem: {
    fontSize: 10,
    color: '#000',
  },

});

export default RegisterScreen;
