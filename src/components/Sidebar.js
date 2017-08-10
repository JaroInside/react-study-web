import * as React from 'react';
import { Link } from 'react-router-dom';
import { Timer } from '.';
import '../index.css';

const Sidebar = () => {
  return (
    <nav className='sidemenu'>
      <ul>
        <li className='navMenu'><Link to="/">Home</Link></li>
        <li className='navMenu'><Link to="/About">About</Link></li>
        <Timer />
      </ul>
    </nav>
  );
}

export default Sidebar;