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
          <li className='auth'><Link className='fa fa-user-circle fa-2x' aria-hidden='true' to="/Login"></Link></li>
          <li className='dropdown-menu fa fa-bars' aria-hidden="true">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/About">About</Link></li>
              <li><Link to="/Login">Login</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;