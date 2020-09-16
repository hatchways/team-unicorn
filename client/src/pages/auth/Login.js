import React from 'react';
import Auth from './Auth';
import LoginForm from './components/LoginForm';

const Login = () => {
  return <Auth formComponent={<LoginForm />} title="Welcome Back!" />;
};

export default Login;
