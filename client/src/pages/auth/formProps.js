// TODO: Somewhat overloaded, probably should be
// restructured if it needs to scale in the future

const formProps = {
  style: {
    textField: {
      margin: 'dense',
      variant: 'outlined',
      fullWidth: true,
      required: true,
    },
  },
  html: {
    signup: {
      email: {
        id: 'email-input',
        name: 'email',
        type: 'email',
        label: 'Email',
        autoComplete: 'username email',
        placeholder: 'Enter email address',
      },
      password: {
        id: 'password-input',
        name: 'password',
        type: 'password',
        label: 'Create Password',
        autoComplete: 'new-password',
      },
      confirmPassword: {
        id: 'confirm-password-input',
        name: 'password',
        type: 'password',
        label: 'Confirm Password',
        autoComplete: 'new-password',
      },
    },
  },
  login: {},
};

export default formProps;
