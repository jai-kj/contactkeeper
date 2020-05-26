import { combineReducers } from 'redux'

import authReducer from './authReducer'
import contactReducer from './contactReducer'
import alertReducer from './alertReducer'

export default combineReducers({
  auth: authReducer,
  contact: contactReducer,
  alerts: alertReducer
})