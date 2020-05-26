import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { clearContacts } from '../../actions/contactActions'

const Navbar = ({ title, icon, isAuthenticated, user, logoutUser, clearContacts }) => {

  const onLogout = () => {
    logoutUser()
    clearContacts()
  }

  const authLinks = (
    <>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          <i className="fas fa-home" /> {user && user.name}
        </Link>
      </li>
      <li className="nav-item">
        <a href="#!" className="nav-link" onClick={onLogout}>
          <i className="fas fa-sign-out-alt" /> Logout
        </a>
      </li>
    </>
  )

  const guestLinks = (
    <>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          <i className="fas fa-sign-in-alt" /> Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          <i className="fas fa-user-plus" /> Register
        </Link>
      </li>
    </>
  )

  return (
    <nav>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <div className="container">
        
          <Link to={ isAuthenticated ? '/' : '/login' } className="navbar-brand text-light">
            <i className={icon} /> {title}
          </Link>
          
          <button 
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  <i className="fas fa-question-circle" /> About
                </Link>
              </li>
              { isAuthenticated ? authLinks : guestLinks }  
            </ul>
          </div>
        </div>
      </nav>
    </nav>
  )
}

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt'
} 

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  logoutUser: PropTypes.func.isRequired,
  clearContacts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, { logoutUser, clearContacts })(Navbar)
