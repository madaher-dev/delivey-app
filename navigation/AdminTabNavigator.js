import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AdminNavigator } from './AdminNavigator';
import Colors from '../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

const Tab = createMaterialBottomTabNavigator();

export const AdminTabNavigator = () => {
  const allOrders = useSelector((state) => state.admin.allOrders);

  const pendingOrders = allOrders.filter(
    (order) => order.status === 'pending' && !order.driver
  );
  const pending = pendingOrders.length;
  const assignedOrders = allOrders.filter(
    (order) => order.status === 'pending' && order.driver
  );

  const assigned = assignedOrders.length;

  const approvedOrders = allOrders.filter(
    (order) => order.status === 'approved'
  );

  const approved = approvedOrders.length;

  const collectedOrders = allOrders.filter(
    (order) => order.status === 'collected'
  );

  const collected = collectedOrders.length;

  return (
    <Tab.Navigator
      activeColor={Colors.primary}
      inactiveColor='#f0edf6'
      barStyle={{ backgroundColor: Colors.accent }}
    >
      <Tab.Screen
        name='Home'
        component={AdminNavigator}
        initialParams={{ status: 'pending' }}
        options={{
          tabBarLabel: 'Home',

          tabBarBadge: pending,
          // tabBarBadgeStyle: { backgroundColor: 'blue' },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('Home', {
              screen: 'Home',
            });
          },
        })}
      />
      <Tab.Screen
        name='Assigned'
        component={AdminNavigator}
        initialParams={{ status: 'assigned' }}
        options={{
          tabBarLabel: 'Assigned',

          tabBarBadge: assigned,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='pen' color={color} size={26} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('Assigned', {
              screen: 'Home',
            });
          },
        })}
      />
      <Tab.Screen
        name='Approved'
        component={AdminNavigator}
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
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('Approved', {
              screen: 'Home',
            });
          },
        })}
      />
      <Tab.Screen
        name='Collected'
        component={AdminNavigator}
        initialParams={{ status: 'collected' }}
        options={{
          tabBarLabel: 'Collected',
          unmountOnBlur: true,
          tabBarBadge: collected,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='bike-fast' color={color} size={26} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('Collected', {
              screen: 'Home',
            });
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default AdminTabNavigator;

const styles = StyleSheet.create({});
