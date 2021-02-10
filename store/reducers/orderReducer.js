import {
  ADD_ORDER,
  CLEAR_ERRORS,
  SET_LOADING_ORDER,
  GET_ORDERS,
  ORDERS_ERROR,
  SET_REFRESHING,
  ADD_ORDER_ERROR,
  GET_COORDINATES,
  GET_COORDINATES_ERROR,
  LOGOUT,
  GET_ALL_ORDERS,
  ALL_ORDERS_ERROR,
  GET_ORDER_ERROR,
  GET_ORDER,
} from '../actions/Types';

const initialState = {
  orders: [],
  error: null,
  loading: null,
  refreshing: null,
  coordinates: null,
  allOrders: [],
  currentOrder: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload.data.orders,
        error: null,
        loading: null,
        refreshing: null,
      };
    case GET_ORDER:
      return {
        ...state,
        currentOrder: action.payload.data.data,
        error: null,
        loading: null,
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: [action.payload.data.order, ...state.orders],
        loading: false,
        coordinates: null,
      };
    case ORDERS_ERROR:
    case ALL_ORDERS_ERROR:
    case GET_ORDER_ERROR:
      return {
        ...state,
        orders: null,
        error: null,
        loading: null,
        refreshing: null,
        currentOrder: {},
      };
    case ADD_ORDER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_LOADING_ORDER:
      return {
        ...state,
        loading: true,
      };
    case SET_REFRESHING:
      return {
        ...state,
        refreshing: true,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case GET_COORDINATES:
      return {
        ...state,
        coordinates: action.payload,
      };
    case GET_COORDINATES_ERROR:
      return {
        ...state,
        coordinates: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        coordinates: null,
        error: null,
        orders: [],
        refreshing: null,
        loading: null,
      };
    case GET_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.payload.data.data,
        error: null,
        loading: null,
        refreshing: null,
      };
    default:
      return state;
  }
};
