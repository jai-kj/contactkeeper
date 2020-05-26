import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { setAlert } from '../../actions/alertActions'
import { loginUser, clearErrors } from '../../actions/authActions'

const Login = ({ error, isAuthenticated, loginUser, clearErrors, setAlert, history }) => {

  const [ user, setUser ] = useState({
    email: '',
    password: ''
  })

  const { email, password } = user

  useEffect(() => {
    if(isAuthenticated) {
      history.push('/')
    }

    if(error === 'Invalid Credentials!' || error === 'Not Authorized, Access Denied!' ){
      setAlert(error, 'danger', 2000)
      clearErrors()
    }
    //eslint-disable-next-line
  }, [error, history, isAuthenticated])

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    loginUser({
      email,
      password
    })
    return
  }

  return (
    <div className="row form-center">
      <div className="col-md-5 mx-auto">
        <h2 className="text-center">Account <span className="text-primary">Login</span></h2>
        <form onSubmit={onSubmit}>
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
              onChange={onChange}
              required  
            />
          </div>
          <input 
            type="submit" 
            value="Login"
            className="btn btn-primary btn-block"
          />
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = state => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect( mapStateToProps, { loginUser, clearErrors, setAlert })(Login)
