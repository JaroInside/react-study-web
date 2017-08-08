import * as React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import '../index.css';

class Header extends React.Component {

  componentDidMount() {
    $('.dropdown-submenu').hide();
    $('.dropdown-menu').click(function(){
			$("ul",this).slideToggle("fast");
		});
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <header>
        <div className='left-content'>
          <Link className='brand-logo' to="/">JaroInside</Link>
        </div>
        <div className='right-content'>
          <ul>
            <li className='auth'><Link className='fa fa-user-circle fa-2x' aria-hidden='true' to="/Login"></Link></li>
            <li className='dropdown-menu fa fa-bars' aria-hidden="true">
              <ul className='dropdown-submenu'>
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
}

export default Header;