import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { addContact, clearCurrent, updateContact } from '../../actions/contactActions'

const AddContact = ({ addContact, current, clearCurrent, updateContact }) => {
  
  useEffect(() => {
    if(current !== null){
      setContact(current)
    } else {
      setContact({ 
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      })
    }
    //eslint-disable-next-line
  }, [current])
  
  const [ contact, setContact ] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  })
  const { name, email, phone, type } = contact

  const onChange = e => setContact({ ...contact, [e.target.name] : e.target.value })

  const clearAll = () => {
    setContact({ 
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    })
    clearCurrent()
  }

  const onSubmit = e => {
    e.preventDefault()
    if(current === null){
      addContact(contact)
    }
    else{
      updateContact(contact)
    }
    clearAll()
  }

  return (
    <form className="m-2 p-2" onSubmit={onSubmit}>
      <h3 className="text-primary text-center mb-4">{current ? 'Edit' : 'Add'} Contact</h3>
      <div className="form-group">
        <input
          type="text" 
          name="name" 
          placeholder="Enter Name"
          value={name}
          className="form-control w-100"
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email" 
          name="email" 
          placeholder="Enter Email"
          value={email}
          className="form-control w-100"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text" 
          name="phone" 
          placeholder="Enter Phone Number"
          value={phone}
          minLength='10'
          className="form-control w-100"
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <h6 className="mt-4">Contact Type</h6>
        <input 
          type="radio" 
          name="type" 
          value="personal"
          checked={type === 'personal'}
          className="m-1"
          onChange={onChange}  
        /> Personal {' '}
        <input 
          type="radio" 
          name="type" 
          value="professional" 
          checked={type === 'professional'}
          onChange={onChange}
          className="m-1" 
        /> Professional {' '}
      </div>

      <div>
        <input 
          type="submit" 
          value={`${current ? 'Update' : 'Add'} Contact`} 
          className="btn btn-primary btn-block my-4" />
      </div>
      {current &&
        <div>
          <input 
            type="submit" 
            value="Clear Form" 
            className="btn btn-light btn-block my-4"
            onClick={clearAll}
          />
        </div>
      }
    </form>
  )
}

AddContact.propTypes = {
  current: PropTypes.object,
  addContact: PropTypes.func.isRequired,  
  clearCurrent: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  current: state.contact.current
})

export default connect( mapStateToProps, { addContact, clearCurrent, updateContact })(AddContact)
