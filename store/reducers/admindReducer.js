import {
  Get_ALL_USERS,
  Get_ALL_USERS_ERROR,
  GET_ALL_ORDERS,
  ALL_ORDERS_ERROR,
  SET_LOADING_ADMIN,
  CLEAR_ERRORS,
  SET_ADMIN_REFRESHING,
  PAY_TRANSACTION_ERROR,
  ADD_ORDER_ERROR
  PAY_TRANSACTION,
  ADD_ORDER,
} from '../actions/Types';

const initialState = {
  allUsers: [],
  error: null,
  loading: null,
  allOrders: [],
  refreshing: false,
  selected: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Get_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload.data.data,
        error: null,
        loading: null,
        refreshing: false,
      };

    case ALL_ORDERS_ERROR:
    case Get_ALL_USERS_ERROR:
    case PAY_TRANSACTION_ERROR:
      case ORDERS_ERROR:
      return {
        ...state,
        allUsers: [],
        allOrders: [],
        error: action.payload,
        refreshing: false,
      };
    case SET_SELECTED:
      return {
        ...state,
        selected: action.payload,
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
        refreshing: false,
      };
    case ADD_ORDER:
      return {
        ...state,
        allOrders: [action.payload.data.order, ...state.allOrders],
        loading: false,
        refreshing: false,
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
        refreshing: false,
      };
    default:
      return state;
  }
};
