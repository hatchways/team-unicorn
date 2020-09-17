import React from 'react';
import Auth from './Auth';
import LoginFooter from './components/LoginFooter';
import LoginForm from './components/LoginForm';

const Login = () => {
  return (
    <Auth
      formComponent={<LoginForm />}
      footerComponent={<LoginFooter />}
      title="Welcome Back!"
    />
  );
};

export default Login;
