import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import AddContact from '../contacts/AddContact'
import Contacts from '../contacts/Contacts'

import { connect } from 'react-redux'
import { loadUser } from '../../actions/authActions'

const Home = ({ loadUser }) => {

  useEffect(() => {
    loadUser()
    //eslint-disable-next-line
  }, [])

  return (
    <div className="row">
      <div className="col-md-6"> 
        <AddContact />
      </div>
      <div className="col-md-6 m-0 p-0">
        <Contacts />
      </div>
    </div>
  )
}

Home.propTypes = {
  loadUser: PropTypes.func.isRequired
}

export default connect(null, { loadUser })(Home)
