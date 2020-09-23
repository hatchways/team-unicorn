// TODO: Probably should be restructured
//       if it needs to scale in the future

const formProps = {
  style: {
    textField: {
      margin: 'dense',
      variant: 'outlined',
      fullWidth: true,
    },
  },
  html: {
    signup: {
      name: {
        id: 'name-input',
        name: 'name',
        type: 'text',
        label: 'Full Name',
        autoComplete: 'name',
        placeholder: 'Enter your full name',
      },
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
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirm Password',
        autoComplete: 'new-password',
      },
    },

    login: {
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
        label: 'Password',
        autoComplete: 'current-password',
      },
    },
  },
};

export default formProps;
