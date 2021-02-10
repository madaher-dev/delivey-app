import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const storeData = async (token, expiresAt) => {
  try {
    const jsonValue = JSON.stringify({ token, expiresAt });
    await AsyncStorage.setItem('userData', jsonValue);
  } catch (e) {
    console.log(e);
  }
};
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    storeData(token);
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
    storeData();
  }
};

export default setAuthToken;
