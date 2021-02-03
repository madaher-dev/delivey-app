import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import OrderDetailsScreen from '../screens/OrderDetails';
import MapScreen from '../screens/MapScreen';
import HomeScreen from '../screens/Home';
import AddOrderScreen from '../screens/AddOrder';
import { defaultNavOptions } from './Options';
import BalanceScreen from '../screens/Balance';

const UserStack = createStackNavigator();

export const UserStackScreen = () => {
  return (
    <UserStack.Navigator screenOptions={defaultNavOptions}>
      <UserStack.Screen
        name='Home'
        component={HomeScreen}
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
      <UserStack.Screen name='Add Order' component={AddOrderScreen} />
      <UserStack.Screen name='Map' component={MapScreen} />

      <UserStack.Screen
        name='Order Details'
        component={OrderDetailsScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </UserStack.Navigator>
  );
};

const BalanceStack = createStackNavigator();

export const BalanceStackScreen = () => {
  return (
    <BalanceStack.Navigator screenOptions={defaultNavOptions}>
      <BalanceStack.Screen
        name='Balance'
        component={BalanceScreen}
        options={({ route, navigation }) => ({
          title: 'Balance',

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
    </BalanceStack.Navigator>
  );
};
