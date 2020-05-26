import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

import { 
  REGISTER_SUCCESS, 
  REGISTER_FAIL, 
  CLEAR_ERRORS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT
} from './types'

//Load User
export const loadUser = () => async dispatch => {
  //@todo - load token into global header
  if(localStorage.token){
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get('/api/auth')
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data.msg
    })
  }
}

//Register User
export const registerUser = (registerForm) => {
  return async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      } 
    }
    try {
      const res = await axios.post('/api/users', registerForm, config)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
      loadUser()
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      })
    }
  }
}

//Login User
export const loginUser = (loginForm) => {
  return async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      } 
    }
    try {
      const res = await axios.post('/api/auth', loginForm, config)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      loadUser()
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      })
    }
  }
}

//Clear Error
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}

//Logout user
export const logoutUser = () => {
  return {
    type: LOGOUT
  }
}