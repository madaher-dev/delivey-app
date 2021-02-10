import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import { DrawerNavigator } from './DrawerNavigator';
import { AdminDrawerNavigator } from './AdminDrawerNavigator';
import { DriverDrawerNavigator } from './DriverDrawerNavigator';
const AppNavigator = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  let userType;
  if (user) userType = user.role;

  return (
    <NavigationContainer>
      {isLoggedIn && userType === 'admin' ? (
        <AdminDrawerNavigator />
      ) : isLoggedIn && userType === 'driver' ? (
        <DriverDrawerNavigator />
      ) : isLoggedIn ? (
        <DrawerNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
