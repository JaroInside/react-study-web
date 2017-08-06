import React from 'react';
import { Authentication } from '../components';

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <Authentication mode={true}/>
    </div>
  );
}

export default Login;