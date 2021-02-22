import { SET_LOADING_ADMIN, SET_ADMIN_REFRESHING, CLEAR_ERRORS } from './Types';

import { factoryget, factorypost } from './actionsFactory';
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

//Send payment
export const payTransaction = (amount, user, type) =>
  factorypost(
    { amount, user, type },
    `${url}/api/v1/tranactions/pay`,
    'PAY_TRANSACTION',
    'PAY_TRANSACTION_ERROR'
  );

// Clear Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });

// Set Loading
export const setLoading = () => ({ type: SET_LOADING_ADMIN });

// Set Refreshing
export const setRefresh = () => ({ type: SET_ADMIN_REFRESHING });
