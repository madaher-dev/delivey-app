import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import OrderDetailsScreen from '../screens/OrderDetails';
import MapScreen from '../screens/MapScreen';
import HomeScreen from '../screens/Home';
import SetAddressScreen from '../screens/SetAddress';
import UserHomeScreen from '../screens/UserHome';
import AddOrderScreen from '../screens/AddOrder';
import { defaultNavOptions } from './Options';
import BalanceScreen from '../screens/Balance';
import AddTransactionScreen from '../screens/admin/AddTransaction';
import AdminBalanceScreen from '../screens/admin/AdminBalance';
import { useSelector } from 'react-redux';
const UserStack = createStackNavigator();

export const UserStackScreen = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <UserStack.Navigator screenOptions={defaultNavOptions}>
      {user && user.location.coordinates.length === 0 ? (
        <UserStack.Screen name='Set Address' component={SetAddressScreen} />
      ) : (
        <>
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
                    iconName={
                      Platform.OS === 'android' ? 'md-menu' : 'ios-menu'
                    }
                    onPress={() => navigation.toggleDrawer()}
                  />
                </HeaderButtons>
              ),
            })}
          />
          <UserStack.Screen name='Add Order' component={AddOrderScreen} />
          <UserStack.Screen name='User Home' component={UserHomeScreen} />
          <UserStack.Screen name='Map' component={MapScreen} />

          <UserStack.Screen
            name='Order Details'
            component={OrderDetailsScreen}
            options={({ route }) => ({ title: route.params.title })}
          />
        </>
      )}
    </UserStack.Navigator>
  );
};

const BalanceStack = createStackNavigator();

export const BalanceStackScreen = () => {
  const user = useSelector((state) => state.auth.user);
  const selected = useSelector((state) => state.admin.selected);
  return (
    <BalanceStack.Navigator screenOptions={defaultNavOptions}>
      <BalanceStack.Screen
        name='Balance'
        component={user.role === 'admin' ? AdminBalanceScreen : BalanceScreen}
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
          headerRight: () =>
            user.role === 'admin' &&
            selected && (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title='Add Transaction'
                  iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                  onPress={() =>
                    navigation.navigate('Add Transaction', {
                      name: selected.name,
                      id: selected._id,
                    })
                  }
                />
              </HeaderButtons>
            ),
        })}
      />
      <UserStack.Screen
        name='Add Transaction'
        component={AddTransactionScreen}
      />
    </BalanceStack.Navigator>
  );
};
