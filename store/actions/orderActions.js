import {
  ADD_ORDER,
  CLEAR_ERRORS,
  SET_LOADING_ORDER,
  SET_REFRESHING,
  ADD_ORDER_ERROR,
} from './Types';
import axios from 'axios';

import { factoryget, factorypatch } from './actionsFactory';
//const factory = require('./actionsFactory');
import ENV from '../../env';
const url = ENV().url;
const googleApiKey = ENV().googleApiKey;

export const getOrders = () =>
  factoryget(`${url}/api/v1/orders/myOrders`, 'GET_ORDERS', 'ORDERS_ERROR');

export const getOrder = (id) =>
  factoryget(`${url}/api/v1/orders/${id}`, 'GET_ORDER', 'GET_ORDER_ERROR');

export const assignDriver = (driverId, order) =>
  factorypatch(
    { driver: driverId },
    `${url}/api/v1/orders/${order}`,
    'GET_ORDER',
    'GET_ORDER_ERROR'
  );
export const declineOrder = (id) =>
  factorypatch(
    { status: 'declined' },
    `${url}/api/v1/orders/${id}`,
    'GET_ORDER',
    'GET_ORDER_ERROR'
  );
export const setStatus = (id, status) =>
  factorypatch(
    { status },
    `${url}/api/v1/orders/${id}`,
    'GET_ORDER',
    'GET_ORDER_ERROR'
  );

//set driver to null
export const rejectOrder = (id) =>
  factorypatch(
    { driver: null, status: 'pending' },
    `${url}/api/v1/orders/${id}`,
    'GET_ORDER',
    'GET_ORDER_ERROR'
  );
export const addOrder = (data) => {
  return async (dispatch, getState) => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    const fulladdress = getState().order.coordinates;
    console.log(fulladdress);
    let address;
    if (fulladdress) address = fulladdress.result.formatted_address;
    //if (data.destination.lng) console.log(data.destination.lng);
    // console.log(data.title);
    // console.log(data.receiver);
    // console.log(data.address);

    const form = new FormData();
    form.append('title', data.title);
    form.append('receiver', data.receiver);
    form.append('receiverPhone', data.receiverPhone);
    form.append('lng', data.destination.lng);
    form.append('lat', data.destination.lat);
    form.append('amount', data.amount);
    form.append('destinationAddress', address);
    form.append('description', data.description);

    if (data.imageUri) {
      let uri = data.imageUri;
      let uriParts = uri.split('.');
      let fileType = uriParts[uriParts.length - 1];

      form.append('imageUri', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    if (data.audioUri) {
      let uri = data.audioUri;
      let uriParts = uri.split('.');
      let fileType = uriParts[uriParts.length - 1];

      form.append('audioUri', {
        uri,
        name: `audio.${fileType}`,
        type: `audio/${fileType}`,
      });
    }

    try {
      const res = await axios.post(`${url}/api/v1/orders`, form, config);

      dispatch({
        type: ADD_ORDER,
        payload: res.data,
      });
    } catch (err) {
      // console.log(err.response.data.message);
      dispatch({
        type: ADD_ORDER_ERROR,
        payload: err.response.data.message,
      });
    }
  };
};

//Get Coordinates

export const getCoordinates = (place) =>
  factoryget(
    `https://maps.googleapis.com/maps/api/place/details/json?input=bar&placeid=${place}&key=${googleApiKey}`,
    'GET_COORDINATES',
    'GET_COORDINATES_ERROR'
  );

// Clear Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });

// Set Loading
export const setLoading = () => ({ type: SET_LOADING_ORDER });

// Set Refreshing
export const setRefresh = () => ({ type: SET_REFRESHING });
