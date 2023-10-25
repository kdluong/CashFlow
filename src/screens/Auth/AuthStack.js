import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeView from './Welcome/WelcomeView';
import LoginView from './Login/LoginView';
import RegisterView from './Register/RegisterView';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeView} />
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Register" component={RegisterView} />
    </Stack.Navigator>
  );
}

export default AuthStack;
