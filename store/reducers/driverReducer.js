import {
  GET_DRIVER_ORDERS,
  DRIVER_ORDERS_ERROR,
  SET_LOADING_DRIVER,
  SET_DRIVER_REFRESHING,
  CLEAR_ERRORS,
  ADD_TRANACTION_FAIL,
  ADD_TRANACTION,
} from '../actions/Types';

const initialState = {
  error: null,
  loading: null,
  allOrders: [],
  refreshing: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DRIVER_ORDERS_ERROR:
    case ADD_TRANACTION_FAIL:
      return {
        ...state,
        allOrders: [],
        error: action.payload,
        refreshing: false,
      };
    case SET_DRIVER_REFRESHING:
      return {
        ...state,
        refreshing: true,
      };
    case GET_DRIVER_ORDERS:
      return {
        ...state,
        allOrders: action.payload.data.orders,
        error: null,
        loading: null,
        refreshing: null,
        refreshing: false,
      };
    case SET_LOADING_DRIVER:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loading: null,
        refreshing: false,
      };
    default:
      return state;
  }
};
