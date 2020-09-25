import React from 'react';
import {Typography, Link} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import AuthFormContainer from './auth/components/AuthFormContainer';
import SignupForm from './auth/components/SignupForm';

const Signup = () => {
  return (
    <AuthLayout>
      <AuthFormContainer key="form" title="Welcome to KanBan!">
        <SignupForm />
      </AuthFormContainer>
      <Typography key="footer" variant="body1" align="center">
        Already have an account? <br />
        <Link component={RouterLink} to="/login" color="primary">
          Login
        </Link>
      </Typography>
    </AuthLayout>
  );
};
export default Signup;
