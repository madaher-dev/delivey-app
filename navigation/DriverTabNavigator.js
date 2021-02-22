import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { DriverNavigator } from './DriverNavigator';
import Colors from '../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

const Tab = createMaterialBottomTabNavigator();

export const DriverTabNavigator = () => {
  const allOrders = useSelector((state) => state.driver.allOrders);
  //console.log(allOrders);
  const approvedOrders = allOrders.filter(
    (order) => order.status === 'approved'
  );

  const approved = approvedOrders.length;

  const pendingOrders = allOrders.filter((order) => order.status === 'pending');

  const pending = pendingOrders.length;

  const collectedOrders = allOrders.filter(
    (order) => order.status === 'collected'
  );

  const collected = collectedOrders.length;

  const deliveredOrders = allOrders.filter(
    (order) => order.status === 'delivered'
  );

  const delivered = deliveredOrders.length;

  return (
    <Tab.Navigator
      activeColor={Colors.primary}
      inactiveColor='#f0edf6'
      barStyle={{ backgroundColor: Colors.accent }}
    >
      <Tab.Screen
        name='Home'
        component={DriverNavigator}
        initialParams={{ status: 'pending' }}
        options={{
          tabBarLabel: 'Home',
          tabBarBadge: pending,
          // tabBarBadgeStyle: { backgroundColor: 'blue' },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name='Approved'
        component={DriverNavigator}
        initialParams={{ status: 'approved' }}
        options={{
          tabBarLabel: 'Approved',
          tabBarBadge: approved,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='check-decagram'
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Collected'
        component={DriverNavigator}
        initialParams={{ status: 'collected' }}
        options={{
          tabBarLabel: 'Collected',
          tabBarBadge: collected,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='bike-fast' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Delivered'
        component={DriverNavigator}
        initialParams={{ status: 'delivered' }}
        options={{
          tabBarLabel: 'Delivered',
          tabBarBadge: delivered,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='trophy' color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DriverTabNavigator;

const styles = StyleSheet.create({});
