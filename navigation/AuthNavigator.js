import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/Signup';
import StartupScreen from '../screens/Startup';
import { defaultNavOptions } from './Options';
const AuthStack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={defaultNavOptions}>
      <AuthStack.Screen
        name='Startup'
        component={StartupScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen name='Login' component={LoginScreen} />
      <AuthStack.Screen name='Signup' component={SignupScreen} />
    </AuthStack.Navigator>
  );
};
