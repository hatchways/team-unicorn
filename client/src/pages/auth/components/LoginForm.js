import React, {useContext} from 'react';
import {makeStyles, Box, TextField, Button} from '@material-ui/core';
import {useForm} from 'react-hook-form';
import formProps from '../formProps';
import formValidation from '../formValidation';
import User from '../../../api/User';
import UserContext from '../../../contexts';

// TODO: Fix login form autofill labels

const useStyles = makeStyles({
  submit: {
    margin: '1.2rem',
  },
});

const LoginForm = () => {
  const {register, handleSubmit, errors} = useForm();
  const {
    email: emailHTMLProps,
    password: passwordHTMLProps,
  } = formProps.html.login;
  const {textField: textFieldStyleProps} = formProps.style;

  const userContext = useContext(UserContext);
  const onSubmit = async (data) => {
    const apiResult = await User.authenticate(data);
    if (apiResult.success) {
      userContext.setUser(apiResult.user);
      userContext.setAuthenticated(true);
    } else {
      // TODO: Display toaster
    }
  };
  const {
    email: emailValidation,
    password: passwordValidation,
  } = formValidation.login;

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
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <TextField
        {...emailHTMLProps}
        {...textFieldStyleProps}
        inputRef={register(emailValidation)}
        {...formValidation.getMuiErrorProps(errors, emailHTMLProps.name)}
      />
      <TextField
        {...passwordHTMLProps}
        {...textFieldStyleProps}
        inputRef={register(passwordValidation)}
        {...formValidation.getMuiErrorProps(errors, passwordHTMLProps.name)}
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

export default LoginForm;
