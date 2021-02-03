import {
  SIGNUP,
  LOGIN,
  SIGNUP_FAIL,
  LOGIN_FAIL,
  SET_LOADING,
  CLEAR_ERRORS,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT,
} from '../actions/Types';
const initialState = {
  user: null,
  isAuth: false,
  error: null,
  token: null,
  loading: false,
  authError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case SIGNUP:
      return {
        ...state,
        user: action.payload.data.user,
        token: action.payload.token,
        //userType: action.payload.data.user.role,
        isAuth: true,
        error: null,
        loading: false,
        authError: false,
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload.data.data,
        //userType: action.payload.data.data.role,
        //token: action.payload.token,
        isAuth: true,
        error: null,
        loading: false,
        authError: false,
      };
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
      return {
        ...state,
        user: null,
        //userType: null,
        token: null,
        isAuth: false,
        error: action.payload,
        loading: false,
        authError: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        authError: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        //userType: null,
        token: null,
        isAuth: false,
        //error: action.payload,
        loading: false,
        authError: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loading: false,
        authError: false,
      };
    default:
      return state;
  }
};
