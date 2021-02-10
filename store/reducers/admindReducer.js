import {
  Get_ALL_USERS,
  Get_ALL_USERS_ERROR,
  GET_ALL_ORDERS,
  ALL_ORDERS_ERROR,
  SET_LOADING_ADMIN,
  CLEAR_ERRORS,
  SET_ADMIN_REFRESHING,
} from '../actions/Types';

const initialState = {
  allUsers: [],
  error: null,
  loading: null,
  allOrders: [],
  refreshing: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Get_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload.data.data,
        error: null,
        loading: null,
        refreshing: null,
      };
    case ALL_ORDERS_ERROR:
    case Get_ALL_USERS_ERROR:
      return {
        ...state,
        allUsers: [],
        allOrders: [],
        error: action.payload,
        refreshing: null,
      };
    case SET_ADMIN_REFRESHING:
      return {
        ...state,
        refreshing: true,
      };
    case GET_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.payload.data.data,
        error: null,
        loading: null,
        refreshing: null,
        refreshing: null,
      };
    case SET_LOADING_ADMIN:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loading: null,
      };
    default:
      return state;
  }
};
