import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/admin/Home';
import SecondScreen from '../screens/admin/Second';
const AdminTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Settings' component={SecondScreen} />
    </Tab.Navigator>
  );
};

export default AdminTabNavigator;

const styles = StyleSheet.create({});
