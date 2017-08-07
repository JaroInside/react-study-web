import React from 'react';
import { Authentication } from '../components';

const Login = () => {
  return (
    <main>
      <h1>Login</h1>
      <Authentication mode={true}/>
    </main>
  );
}

export default Login;