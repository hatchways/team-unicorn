import React, {useState} from 'react';
import {makeStyles, Box, TextField, Button} from '@material-ui/core';
import {useForm} from 'react-hook-form';
import {Redirect} from 'react-router-dom';
import formProps from '../formProps';
import formValidation from '../formValidation';
import User from '../../../api/User';

const useStyles = makeStyles({
  submit: {
    margin: '1.2rem',
  },
});

const SignupForm = () => {
  const {register, handleSubmit, getValues, trigger, errors} = useForm({
    mode: 'onTouched',
  });
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (data) => {
    const apiResult = await User.create(data);
    if (apiResult.success) {
      setRedirect(true);
    } else {
      // TODO: Render toaster
    }
  };

  const {
    name: fullNameHTMLProps,
    email: emailHTMLProps,
    password: passwordHTMLProps,
    confirmPassword: confirmPasswordHTMLProps,
  } = formProps.html.signup;
  const {textField: textFieldStyleProps} = formProps.style;

  const {
    name: fullNameValidation,
    email: emailValidation,
    password: passwordValidationFactory,
    confirmPassword: confirmPasswordValidationFactory,
  } = formValidation.signup;

  // NOTE: Password validation needs to trigger password confirmation
  //      validation, so the config takes a callback to trigger it.
  //      Similarly, password confirmation validation needs
  //      the password's value, hence the config takes a callback to retrive it.
  const passwordValidation = passwordValidationFactory(() =>
    trigger(confirmPasswordHTMLProps.name),
  );
  const confirmPasswordValidation = confirmPasswordValidationFactory(() =>
    getValues(passwordHTMLProps.name),
  );

  const classes = useStyles();

  return redirect ? (
    <Redirect to="/login" />
  ) : (
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
        {...textFieldStyleProps}
        {...fullNameHTMLProps}
        inputRef={register(fullNameValidation)}
        {...formValidation.getMuiErrorProps(errors, fullNameHTMLProps.name)}
      />

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
