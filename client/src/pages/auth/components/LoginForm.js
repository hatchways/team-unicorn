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

const LoginForm = ({openSnackbar}) => {
  const {register, handleSubmit, errors: formErrors} = useForm();
  const {
    email: emailHTMLProps,
    password: passwordHTMLProps,
  } = formProps.html.login;
  const {textField: textFieldStyleProps} = formProps.style;

  const userContext = useContext(UserContext);
  const onSubmit = async (data) => {
    const {success, data: apiData, errors: apiErrors} = await User.authenticate(
      data,
    );
    if (success) {
      const {user} = apiData;
      userContext.setUser(user);
      userContext.setAuthenticated(true);
      openSnackbar('Success!', 'success');
    } else {
      const errorKeys = Object.getOwnPropertyNames(apiErrors);
      const message = apiErrors[errorKeys[0]];
      // TODO: Display toaster
      openSnackbar(message, 'error');
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
        {...formValidation.getMuiErrorProps(formErrors, emailHTMLProps.name)}
        required
      />
      <TextField
        {...passwordHTMLProps}
        {...textFieldStyleProps}
        inputRef={register(passwordValidation)}
        {...formValidation.getMuiErrorProps(formErrors, passwordHTMLProps.name)}
        required
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
