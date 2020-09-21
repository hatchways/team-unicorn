import {Box, Paper, Typography} from '@material-ui/core';
import React from 'react';

const AuthFormContainer = ({title, children}) => {
  return (
    <Box
      component={Paper}
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      justifyContent="space-around"
      px={3}
      elevation={3}
      width="300px"
      height="400px"
    >
      <Box>
        <Typography variant="h5" align="center">
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};
export default AuthFormContainer;
