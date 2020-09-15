import {TextField, Typography, Box, Button} from '@material-ui/core';
import React, {useState} from 'react';
import validation from './validation';

const AuthForm = ({title}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const isEmailValid = validation.validateEmail(email);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      justifyContent="space-around"
      width="300px"
      height="300px"
    >
      <Box>
        <Typography variant="h5" align="center">
          {title}
        </Typography>
      </Box>
      <Box id="signup" component="form" textAlign="center">
        <TextField
          id="email-input"
          name="email"
          type="email"
          label="Email"
          helperText={isEmailValid ? '' : 'Please enter a valid email.'}
          autoComplete="username email"
          placeholder="Enter email address"
          margin="dense"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          required
          error={!isEmailValid}
        />
        <TextField
          id="password-input"
          name="password"
          type="password"
          label="Create Password"
          autoComplete="new-password"
          variant="outlined"
          margin="dense"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          required
        />
        <TextField
          name="password"
          type="password"
          label="Confirm Password"
          autoComplete="new-password"
          variant="outlined"
          margin="dense"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};
export default AuthForm;
