import React, { useState } from "react";
import { login } from "../services/authService";
import { validarEmail, validarSenha } from "../utils/validators";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
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
      const response = await login(email, senha);
      if (response.token) {
        Alert.alert('Sucesso', 'Login realizado com sucesso');
        navigation.navigate('EventListScreen');
      }
    } catch (error: any) {
      Alert.alert('Erro', error?.message || 'Erro ao fazer login');
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

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          <Text style={styles.registerButtonText}>REGISTRO</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert('Recuperar senha')}>
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFFFC5',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: width * 3.6,
    height: height * 0.3,
  },
  formContainer: {
    backgroundColor: '#4CAF50',
    marginHorizontal: width * 0.05,
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#000',
    fontWeight: 'bold',
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
  forgotPasswordText: {
    color: '#000',
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
