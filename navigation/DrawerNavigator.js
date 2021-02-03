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
import { UserStackScreen, BalanceStackScreen } from './UserNavigator';
import { defaultNavOptions, drawerOption } from './Options';

const Drawer = createDrawerNavigator();
export const DrawerNavigator = () => {
  //const userType = useSelector((state) => state.auth.userType);

  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      initialRouteName='User Home'
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
        name='User Home'
        component={UserStackScreen}
        options={{ drawerLabel: 'Orders' }}
      />
      <Drawer.Screen name='Balance' component={BalanceStackScreen} />
    </Drawer.Navigator>
  );
};
