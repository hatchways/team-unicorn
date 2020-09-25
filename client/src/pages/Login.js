import React from 'react';
import {Typography, Link} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import AuthFormContainer from './auth/components/AuthFormContainer';
import LoginForm from './auth/components/LoginForm';

const Login = () => {
  return (
    <AuthLayout>
      <AuthFormContainer key="form" title="Welcome Back!">
        <LoginForm />
      </AuthFormContainer>
      <Typography key="footer" variant="body1" align="center">
        Don&apos;t have an account yet? <br />
        <Link component={RouterLink} to="/signup" color="primary">
          Signup
        </Link>
      </Typography>
    </AuthLayout>
  );
};

export default Login;
