import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/driver/Home';
import OrderDetailsScreen from '../screens/driver/OrderDetails';
import { defaultNavOptions } from './Options';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';

const AdminHomeStack = createStackNavigator();
export const DriverNavigator = ({ route }) => {
  const status = route.params.status;
  //console.log(status);
  return (
    <AdminHomeStack.Navigator screenOptions={defaultNavOptions}>
      <AdminHomeStack.Screen
        name='Home'
        component={HomeScreen}
        initialParams={
          status === 'pending'
            ? { status: 'pending' }
            : status === 'approved'
            ? { status: 'approved' }
            : status === 'collected'
            ? { status: 'collected' }
            : status === 'delivered'
            ? { status: 'delivered' }
            : null
        }
        options={({ route, navigation }) => ({
          title: 'Delivery app',
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title='Add Order'
                iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                onPress={() => navigation.navigate('Add Order')}
              />
            </HeaderButtons>
          ),
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title='Menu'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
        })}
      />
      <AdminHomeStack.Screen
        name='Order Details'
        component={OrderDetailsScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </AdminHomeStack.Navigator>
  );
};

const styles = StyleSheet.create({});
