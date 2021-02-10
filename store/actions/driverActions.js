import {
  SET_LOADING_DRIVER,
  SET_DRIVER_REFRESHING,
  CLEAR_ERRORS,
} from './Types';

import { factoryget } from './actionsFactory';
//const factory = require('./actionsFactory');
import ENV from '../../env';
const url = ENV().url;

export const getAllOrders = () =>
  factoryget(
    `${url}/api/v1/orders/driverOrders`,
    'GET_DRIVER_ORDERS',
    'DRIVER_ORDERS_ERROR'
  );

// Clear Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });

// Set Loading
export const setLoading = () => ({ type: SET_LOADING_DRIVER });

// Set Refreshing
export const setRefresh = () => ({ type: SET_DRIVER_REFRESHING });
