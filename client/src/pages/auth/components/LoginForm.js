import React, {useState} from 'react';
import {makeStyles, Box, TextField, Button} from '@material-ui/core';
import formProps from '../formProps';

// TODO: Fix login form autofill labels

const useStyles = makeStyles({
  submit: {
    margin: '1.2rem',
  },
});

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const {
    email: emailHTMLProps,
    password: passwordHTMLProps,
  } = formProps.html.login;
  const {textField: textFieldStyleProps} = formProps.style;

  const classes = useStyles();

  return (
    <Box
      id="login"
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Log In
      </Button>
    </Box>
  );
};

export default SignupForm;
