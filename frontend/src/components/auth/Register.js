import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { setAlert } from '../../actions/alertActions'
import { registerUser, clearErrors } from '../../actions/authActions'

const Register = ({ error, setAlert, registerUser, clearErrors, isAuthenticated, history }) => {
  
  const [ user, setUser ] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const { name, email, password, confirmPassword } = user
  
  useEffect(() => {
    if(isAuthenticated) {
      history.push('/')
    }

    if(error === 'User with email already exists!'){
      setAlert(error, 'danger', 2000)
      clearErrors()
    }
    //eslint-disable-next-line
  }, [error, history, isAuthenticated])

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    if(password !== confirmPassword){
      setAlert(`Passwords Didn't Match!`, 'danger')
    } else {
      registerUser({
        name,
        email,
        password
      })
      return
    }
  }

  return (
    <div className="row form-center">
      <div className="col-md-5 mx-auto">
        <h2 className="text-center">Account <span className="text-primary">Register</span></h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text"
              name="name"
              value={name}
              className="form-control"
              onChange={onChange}
              required  
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email"
              name="email"
              value={email}
              className="form-control"
              onChange={onChange}
              required  
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password"
              name="password"
              value={password}
              className="form-control"
              minLength='6'
              onChange={onChange}
              required  
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input 
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              className="form-control"
              minLength='6'
              onChange={onChange}
              required  
            />
          </div>
          <input 
            type="submit" 
            value="Register"
            className="btn btn-primary btn-block"
          />
        </form>
      </div>
    </div>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = state => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect( mapStateToProps, { setAlert, registerUser, clearErrors })(Register)
