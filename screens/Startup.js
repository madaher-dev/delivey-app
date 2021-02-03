import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from '../store/actions/authActions';

const Startup = (props) => {
  const authError = useSelector((state) => state.auth.authError);
  // console.log(authError);

  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (authError) {
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  }, [authError]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      const values = JSON.parse(jsonValue);
      if (values) {
        if (values.token) {
          axios.defaults.headers.common['x-auth-token'] = values.token;
          dispatch(checkUser());
        } else {
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      } else {
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  );
};

export default Startup;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
