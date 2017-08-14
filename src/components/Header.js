import * as React from 'react';
import { Link } from 'react-router-dom';
import { Caption } from '.';
import { mobileEvent } from '../event';
import '../index.css';

class Header extends React.Component {

  componentDidMount() {
    const deviceType = this.props.deviceType;
    if(deviceType === 'MOBILE') {
      mobileEvent.mobileDropMenuEvent();
    }
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <header>
        <div className='left-content'>
          <Link className='brand-logo' to="/">JaroInside</Link>
        </div>
        <Caption />
        <div className='right-content'>
          <ul>
            <li className='auth'><Link className='fa fa-user-circle fa-2x' aria-hidden='true' to="/Login"></Link></li>
            <li className='dropdown-menu fa fa-bars fa-2x' aria-hidden="true"></li>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;