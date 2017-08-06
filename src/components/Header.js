import React from 'react';
import PropTypes from 'prop-types';
import { Link} from 'react-router-dom';

const Header = (props) => {

  const loginButton = (
    <li>
      <Link to="/login">
        <i className="material-icons">vpn_key</i>
      </Link>
    </li>
  );

  const logoutButton = (
    <li>
      <Link to="/Register">
        <i className="material-icons">vpn_open</i>
      </Link>
    </li>
  );

  return (
    <nav>
      <div className="nav-wrapper grey darken-4">
        <a className="brand-logo center">React-Study</a>
        <ul className="left">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Login">Login</Link></li>
          <li><Link to="/Register">Register</Link></li>
        </ul>
        <div className="right">
          <ul>
            { props.isLoggedIn ? logoutButton : loginButton }
          </ul>
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool,
    onLogout: PropTypes.func
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined");}
};

export default Header;