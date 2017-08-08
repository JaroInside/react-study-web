import * as React from 'react';
import { Link } from 'react-router-dom';
import { Authentication } from '../components';

class Login extends React.Component {

  componentDidMount() {
  }

  componentWillUnmount() {
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