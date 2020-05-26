import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <h1 className="display-4 mb-3"><span className='text-danger'>404</span> Page Not Found</h1>
      <p className="lead">Sorry, page doesn't exist! <br /><Link to='/'>Click Here to redirect to Home Page</Link></p>
    </div>
  )
}
