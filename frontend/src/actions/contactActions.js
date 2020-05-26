import axios from 'axios'

import { 
  ADD_CONTACT, 
  DELETE_CONTACT, 
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACTS_ERROR,
  CLEAR_CONTACTS,
  GET_CONTACTS
} from './types'

//Get all users Contacts
export const getContacts = () => async dispatch => {
  try {
    const res = await axios.get('/api/contacts')
    dispatch({
      type: GET_CONTACTS,
      payload: res.data
    })
  } catch (err) {
    console.log("err", err.response.data.msg)
    dispatch({
      type: CONTACTS_ERROR,
      payload: err.response.data.msg
    })
  }
}

//Add Contact
export const addContact = (contact) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    } 
  }
  try {
    const res = await axios.post('/api/contacts', contact, config)
    dispatch({
      type: ADD_CONTACT,
      payload: res.data
    })
  } catch (err) { 
    console.log("err", err)
    dispatch({
      type: CONTACTS_ERROR,
      payload: err.response.data.msg
    })
  }
}

//Update Contact
export const updateContact = (contact) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    } 
  }
  try {
    const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data
    })
  } catch (err) {
    console.log("err", err)
    dispatch({
      type: CONTACTS_ERROR,
      payload: err.response.data.msg
    })
  }
}

// Delete Contact
export const deleteContact = (id) => async dispatch => {
  try {
    await axios.delete(`/api/contacts/${id}`)
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    })
  } catch (err) {
    console.log("err", err)
    dispatch({
      type: CONTACTS_ERROR,
      payload: err.response.data.msg
    })
  }
}

//Set Current
export const setCurrent = (contact) => dispatch => {
  dispatch({
    type: SET_CURRENT,
    payload: contact
  })
}

//Clear Current
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  }
}

//Filter Contacts
export const filterContacts = (text) => dispatch => {
  dispatch ({
    type: FILTER_CONTACTS,
    payload: text
  })
}

//Clear Filter
export const clearFilter = () => {
  return {
    type: CLEAR_FILTER
  }
}

//Clear Fetched Contacts
export const clearContacts = () => {
  return {
    type: CLEAR_CONTACTS
  }
}