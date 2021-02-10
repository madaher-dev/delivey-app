import {
  Get_ALL_USERS,
  GET_ALL_ORDERS,
  ALL_ORDERS_ERROR,
  SET_LOADING_ADMIN,
  SET_ADMIN_REFRESHING,
  CLEAR_ERRORS,
} from './Types';
import axios from 'axios';

import { factoryget } from './actionsFactory';
//const factory = require('./actionsFactory');
import ENV from '../../env';
const url = ENV().url;

export const getAllUsers = () =>
  factoryget(
    `${url}/api/v1/users?sort='name'`,
    'Get_ALL_USERS',
    'Get_ALL_USERS_ERROR'
  );

export const getAllOrders = () =>
  factoryget(`${url}/api/v1/orders/`, 'GET_ALL_ORDERS', 'ALL_ORDERS_ERROR');

// Clear Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });

// Set Loading
export const setLoading = () => ({ type: SET_LOADING_ADMIN });

// Set Refreshing
export const setRefresh = () => ({ type: SET_ADMIN_REFRESHING });
