import React from 'react';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { View, Button } from 'react-native';
import Colors from '../constants/Colors';
import { logout } from '../store/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { BalanceStackScreen } from './UserNavigator';
import { drawerOption } from './Options';
import { DriverTabNavigator } from './DriverTabNavigator';

const Drawer = createDrawerNavigator();
export const DriverDrawerNavigator = () => {
  //const userType = useSelector((state) => state.auth.user.type);

  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      initialRouteName='Driver Home'
      //screenOptions={defaultNavOptions}
      drawerType='slide'
      // overlayColor='black'
      drawerContentOptions={drawerOption}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 50 }}>
            <DrawerContentScrollView
              forceInset={{ top: 'always', horizontal: 'never' }}
            >
              <DrawerItemList {...props} />
              <View
                style={{
                  marginTop: 50,
                }}
              >
                <Button
                  title='Logout'
                  color={Colors.primary}
                  onPress={() => {
                    dispatch(logout());
                    // props.navigation.navigate('Auth');
                  }}
                />
              </View>
            </DrawerContentScrollView>
          </View>
        );
      }}
    >
      <Drawer.Screen
        name='Driver Home'
        component={DriverTabNavigator}
        options={{ drawerLabel: 'Orders' }}
      />
      <Drawer.Screen name='Balance' component={BalanceStackScreen} />
    </Drawer.Navigator>
  );
};
