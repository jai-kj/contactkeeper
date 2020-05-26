import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import ContactFilter from '../contacts/ContactFilter'

import { connect } from 'react-redux'
import { getContacts } from '../../actions/contactActions'

import ContactItem from './ContactItem'
import Spinner from '../layout/Spinner'

const Contacts = ({ contacts, filtered, loading, getContacts, user }) => {

  useEffect(() => {
    if(user !== null) {
      getContacts()
    }
    //eslint-disable-next-line
  }, [user])
  
  return (
    <div className="bg-light p-4">
      <ContactFilter />
      <div style={{ height: '70vh', overflowY: 'auto' }}>
        { contacts !== null && !loading 
          ? contacts.length === 0
            ? (<p className="text-danger empty">No Contacts Found! Please Create New Contact.</p>)
            : filtered !== null 
              ? filtered.length === 0
                ? (<p className="text-danger empty">No Contacts found for the following Search!</p>)
                : (
                  <TransitionGroup>
                    {
                      filtered.map(filter => (
                        <CSSTransition
                          key={filter._id}
                          timeout={500}
                          className="item"
                        >
                          <ContactItem contact={filter} />
                        </CSSTransition>
                      ))
                    }
                  </TransitionGroup>
                ) 
                
            : (
              <TransitionGroup>
                {
                  contacts.map(contact => (
                    <CSSTransition
                      key={contact._id}
                      timeout={500}
                      className="item"
                    >
                      <ContactItem contact={contact} />
                    </CSSTransition>
                  ))
                }
              </TransitionGroup>
            )
          : <Spinner /> 
        }
        
      </div>
    </div>
  )
}

Contacts.propTypes = {
  contacts: PropTypes.array,
  filtered: PropTypes.array,
  user: PropTypes.object,
  loading: PropTypes.bool,
  getContacts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  contacts: state.contact.contacts,
  filtered: state.contact.filtered,
  loading: state.contact.loading,
  user: state.auth.user
})

export default connect( mapStateToProps, { getContacts })(Contacts)
