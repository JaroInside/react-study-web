import * as React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Header = (props) => {

  return (
    <header>
      <div className='left-content'>
        <Link className='brand-logo' to="/">JaroInside</Link>
      </div>
      <div className='right-content'>
        <ul>
          <li className='auth'><Link to="/Login">Login</Link></li>
          <li className='auth'><Link to="/Register">Register</Link></li>  
        </ul>
      </div>
    </header>
  );
}

export default Header;