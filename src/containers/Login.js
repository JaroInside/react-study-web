import * as React from 'react';
import { Link } from 'react-router-dom';
import { Authentication } from '../components';

class Login extends React.Component {

  componentDidMount() {
    document.getElementsByClassName('sidemenu')[0].style.display = "none";
    document.getElementsByClassName('auth')[0].style.display = "none";
  }

  componentWillUnmount() {
    document.getElementsByClassName('sidemenu')[0].style.display = "block";
    document.getElementsByClassName('auth')[0].style.display = "block";
  }

  render() {
    return (
      <main>
        <Authentication mode={true}/>
        <Link to="/">Go To Home</Link>
      </main>
    );
  }
}

export default Login;