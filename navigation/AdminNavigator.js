import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/admin/Home';
import OrderDetailsScreen from '../screens/admin/OrderDetails';
import { defaultNavOptions } from './Options';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import AddOrderScreen from '../screens/AddOrder';
import MapScreen from '../screens/MapScreen';

const AdminHomeStack = createStackNavigator();
export const AdminNavigator = ({ route }) => {
  const status = route.params.status;
  const main = route.params.main;
  //console.log(status);
  return (
    <AdminHomeStack.Navigator
      screenOptions={defaultNavOptions}
      initialRouteName='Home'
    >
      <AdminHomeStack.Screen
        name='Home'
        component={HomeScreen}
        initialParams={
          status === 'pending'
            ? { status: 'pending' }
            : status === 'assigned'
            ? { status: 'assigned' }
            : status === 'approved'
            ? { status: 'approved' }
            : status === 'collected'
            ? { status: 'collected' }
            : null
        }
        options={({ route, navigation }) => ({
          title: 'تبع الديلفري',

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
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <AdminHomeStack.Screen name='Add Order' component={AddOrderScreen} />
      <AdminHomeStack.Screen name='Map' component={MapScreen} />
    </AdminHomeStack.Navigator>
  );
};

const styles = StyleSheet.create({});
