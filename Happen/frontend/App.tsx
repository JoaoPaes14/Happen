import React, { ReactNode } from 'react';  
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';  
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/loginScreen';
import EventListScreen from './screens/EventListScreen';
import LoadingScreen from './screens/loadingScreen';
import RegisterScreen from './screens/registerScreen';
import CreateEventScreen from './screens/createEventScreen';
import EventDetailScreen from './screens/eventDetailScreen';

const Stack = createStackNavigator();

// Tipando children como ReactNode
function KeyboardWrapper({ children }: { children: ReactNode }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EventListScreen">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventListScreen"
          component={EventListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateEventScreen"
          component={CreateEventScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventDetailScreen"
          component={EventDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
