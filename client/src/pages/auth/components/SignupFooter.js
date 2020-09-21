import React from 'react';
import {Typography, Link} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

const SignupFooter = () => {
  return (
    <Typography variant="body1" align="center">
      Already have an account? <br />
      <Link component={RouterLink} to="/login" color="primary">
        Login
      </Link>
    </Typography>
  );
};

export default SignupFooter;
