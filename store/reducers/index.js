import { combineReducers } from 'redux';
import authReducer from './authReducer';
import orderReducer from './orderReducer';
import adminReducer from './admindReducer';
import driverReducer from './driverReducer';
export default combineReducers({
  auth: authReducer,
  order: orderReducer,
  admin: adminReducer,
  driver: driverReducer,
});
