import {
  ADD_ORDER,
  CLEAR_ERRORS,
  SET_LOADING_ORDER,
  SET_REFRESHING,
  ADD_ORDER_ERROR,
  GET_COORDINATES,
} from './Types';
import axios from 'axios';

import { factoryget } from './actionsFactory';
//const factory = require('./actionsFactory');
import ENV from '../../env';
const url = ENV().url;
const googleApiKey = ENV().googleApiKey;

export const getOrders = () =>
  factoryget(`${url}/api/v1/orders/myOrders`, 'GET_ORDERS', 'ORDERS_ERROR');

export const addOrder = (data) => {
  return async (dispatch, getState) => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    //console.log(data.destination.lng);
    const fulladdress = getState().order.coordinates;
    let address;
    if (fulladdress) address = fulladdress.result.formatted_address;

    //console.log(address);
    const form = new FormData();

    form.append('title', data.title);
    form.append('receiver', data.receiver);
    form.append('rePhone', data.rePhone);
    form.append('lng', data.destination.lng);
    form.append('lat', data.destination.lat);
    form.append('amount', data.amount);
    form.append('destinationAddress', address);
    //console.log(data.imageUris);
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

    // // form.append('files', images);
    // let images = data.imageUris;
    // console.log(images);
    // images.map((file) => {
    //   console.log(file);
    //   form.append('imageUris', file);
    // });

    try {
      const res = await axios.post(`${url}/api/v1/orders`, form, config);

      dispatch({
        type: ADD_ORDER,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
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
