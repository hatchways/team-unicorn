import React, {useState} from 'react';
import {makeStyles, Box, TextField, Button} from '@material-ui/core';
import formProps from '../formProps';

const useStyles = makeStyles({
  submit: {
    margin: '1.2rem',
  },
});

const SignupForm = () => {
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

  const {
    email: emailHTMLProps,
    password: passwordHTMLProps,
    confirmPassword: confirmPasswordHTMLProps,
  } = formProps.html.signup;
  const {textField: textFieldStyleProps} = formProps.style;

  const classes = useStyles();

  return (
    <Box
      id="signup"
      component="form"
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <TextField
        {...emailHTMLProps}
        {...textFieldStyleProps}
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        {...passwordHTMLProps}
        {...textFieldStyleProps}
        value={password}
        onChange={handlePasswordChange}
      />
      <TextField
        {...confirmPasswordHTMLProps}
        {...textFieldStyleProps}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignupForm;
