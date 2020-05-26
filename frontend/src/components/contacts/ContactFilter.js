import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { filterContacts, clearFilter } from '../../actions/contactActions'

const ContactFilter = ({ filterContacts, clearFilter, filtered }) => {

  const text = useRef('')

  useEffect(() => {
    if(filtered === null){
      text.current.value = ''
    }
    //eslint-disable-next-line
  }, [filtered])

  const onChange = e => {
    if(text.current.value !== ''){
      filterContacts(e.target.value)
    }
    else {
      clearFilter()
    }
  }

  return (
    <form>
      <div className="form-group">
        <input 
          type="text"
          ref={text}
          className="form-control"
          placeholder="Search Contacts"
          onChange={onChange}
        />
      </div>
    </form>
  )
}

ContactFilter.propTypes = {
  filterContacts: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  filtered: PropTypes.array
}

const mapStateToProps = state => ({
  filtered: state.contact.filtered
})

export default connect( mapStateToProps, { filterContacts, clearFilter })(ContactFilter)
