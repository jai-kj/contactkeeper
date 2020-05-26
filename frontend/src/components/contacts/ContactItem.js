import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { deleteContact, setCurrent, clearCurrent } from '../../actions/contactActions'

const ContactItem = ({ contact, deleteContact, setCurrent, clearCurrent }) => {

  const { _id, name, email, phone, type } = contact

  const deleteClick = () => {
    deleteContact(_id)
    clearCurrent()
  }

  return (
    <div className="card mb-2 p-3">
      <h5 className="text-primary">
        {name}{' '}
        <span 
          style={{ float: 'right' }}
          className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h5>
      <ul className="list-group mt-2">
        {email !== null && 
          (<li className="list-group-item">
            <i className="fas fa-envelope-open" /> {email !== '' ? email : 'No Email Provided'}
          </li>)
        }
        {phone !== null && 
          (<li className="list-group-item">
            <i className="fas fa-phone" /> {phone !== '' ? phone : 'No Phone Provided'}
          </li>)
        }
      </ul>
      <div>
        <button 
          className="btn btn-dark btn-sm mt-3 m-1"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button 
          className="btn btn-danger btn-sm mt-3 m-1"
          onClick={deleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
} 
  
export default connect( null, { deleteContact, setCurrent, clearCurrent })(ContactItem)
