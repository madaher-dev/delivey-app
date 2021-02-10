import {
  SIGNUP,
  LOGIN,
  SIGNUP_FAIL,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  SET_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from './Types';
import axios from 'axios';
import setAuthToken from '../../utils/setauthtoken';
import { factorypost } from './actionsFactory';
import ENV from '../../env';
const url = ENV().url;

export const signup = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const credentials = {
    name,
    email,
    password,
    passwordConfirm: password,
  };

  try {
    const response = await axios.post(
      `${url}/api/v1/users/signup`,
      credentials,
      config
    );

    dispatch({
      type: SIGNUP,
      payload: response.data,
    });
  } catch (error) {
    var errMsg = error.response.data.message;

    var firstWord = errMsg.replace(/ .*/, '');

    if (firstWord === 'Duplicate') errMsg = 'User Already Exists';

    //console.log(errMsg);
    if (error.response.data.message)
      dispatch({
        type: SIGNUP_FAIL,
        payload: errMsg,
      });
  }
};

export const login = (email, password) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const credentials = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${url}/api/v1/users/login`,
        credentials,
        config
      );

      dispatch({
        type: LOGIN,
        payload: response.data,
      });
    } catch (error) {
      //console.log(error);

      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

//Logout

export const logout = () => {
  setAuthToken();
  return { type: LOGOUT };
};

// Clear Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });

// Set Loading
export const setLoading = () => ({ type: SET_LOADING });

//Similar to loadUser but does not return error on fail
export const checkUser = () => async (dispatch) => {
  try {
    const response = await axios.get(`${url}/api/v1/users/me`);
    dispatch({
      type: USER_LOADED,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Set initial user location

export const setAddress = (address) =>
  factorypost(
    address,
    `${url}/api/v1/users/setAddress`,
    'USER_LOADED',
    'AUTH_ERROR'
  );
