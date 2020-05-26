import { 
  ADD_CONTACT,
  CONTACTS_ERROR, 
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  GET_CONTACTS,
  CLEAR_CONTACTS
} from '../actions/types'

const initialState = {
  contacts: null,
  current: null,
  filtered: null,
  error: null,
  loading: true
}

export default ( state = initialState, action ) => {
  switch(action.type){

    case GET_CONTACTS: 
      return {
        ...state,
        contacts: action.payload,
        loading: false
      }

    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false
      }

    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact),
        loading: false
      }

    case DELETE_CONTACT: 
    return {
      ...state,
      contacts: state.contacts.filter(contact => contact._id !== action.payload),
      loading: false
    }

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload 
      }

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, 'gi')
          return contact.name.match(regex) 
          || contact.email.match(regex) 
          || contact.phone.match(regex) 
          || contact.type.match(regex)
        })
      }
    
    case CLEAR_FILTER: 
      return {
        ...state,
        filtered: null
      }
  
    case CONTACTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        loading: true,
        filtered: null,
        current: null,
        error: null
      }
    
    default: 
      return state
  }
}