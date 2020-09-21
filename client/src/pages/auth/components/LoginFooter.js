import React from 'react';
import {Typography, Link} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

const LoginFooter = () => {
  return (
    <Typography variant="body1" align="center">
      Don&apos;t have an account yet? <br />
      <Link component={RouterLink} to="/signup" color="primary">
        Signup
      </Link>
    </Typography>
  );
};

export default LoginFooter;
