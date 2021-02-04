import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import { DrawerNavigator } from './DrawerNavigator';
import { AdminDrawerNavigator } from './AdminDrawerNavigator';

const AppNavigator = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isAuth);
  const userType = useSelector((state) => state.auth.user.type);
  return (
    <NavigationContainer>
      {isLoggedIn && userType === 'admin' ? (
        <AdminDrawerNavigator />
      ) : isLoggedIn ? (
        <DrawerNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
