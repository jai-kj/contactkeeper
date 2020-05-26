import React from 'react'
import spinner from './spinner.gif'

const Spinner = () => {
  return (
    <>
      <img 
        src={spinner} 
        alt="Loading ..."
        className="empty"
        style={{ width: '50px', margin: 'auto', display: 'block' }}
      />
    </>
  )
}

export default Spinner
