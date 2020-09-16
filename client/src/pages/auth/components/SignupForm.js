import React from 'react';
import {makeStyles, Box, TextField, Button} from '@material-ui/core';
import {useForm} from 'react-hook-form';
import formProps from '../formProps';
import formValidation from '../formValidation';

const useStyles = makeStyles({
  submit: {
    margin: '1.2rem',
  },
});

const SignupForm = () => {
  const {register, handleSubmit, getValues, trigger, errors} = useForm({
    mode: 'onTouched',
  });

  // TODO/IN: Implement and integrate data api
  const onSubmit = (data) => console.log(data);

  const {
    email: emailHTMLProps,
    password: passwordHTMLProps,
    confirmPassword: confirmPasswordHTMLProps,
  } = formProps.html.signup;
  const {textField: textFieldStyleProps} = formProps.style;

  const {
    email: emailValidation,
    password: passwordValidationFactory,
    confirmPassword: confirmPasswordValidationFactory,
  } = formValidation.signup;

  const passwordValidation = passwordValidationFactory(() =>
    trigger(confirmPasswordHTMLProps.name),
  );
  const confirmPasswordValidation = confirmPasswordValidationFactory(() =>
    getValues(passwordHTMLProps.name),
  );

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
      <TextField
        {...confirmPasswordHTMLProps}
        {...textFieldStyleProps}
        inputRef={register(confirmPasswordValidation)}
        {...formValidation.getMuiErrorProps(
          errors,
          confirmPasswordHTMLProps.name,
        )}
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
