const formValidation = {
  signup: {
    email: {
      required: 'Please enter an email address.',
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Please enter a valid email address.',
      },
    },
    password: (triggerConfirmationValidation) => {
      return {
        required: 'Please enter a password.',
        minLength: {
          value: 8,
          message: 'Must be at least 8 characters long.',
        },
        validate: () => {
          triggerConfirmationValidation();
          return true;
        },
      };
    },
    confirmPassword: (getPasswordValue) => {
      return {
        validate: (value) =>
          value === getPasswordValue() || 'Passwords must match.',
      };
    },
  },
  login: {
    email: {
      required: 'Please enter your email address.',
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Email is not valid.',
      },
    },
    password: {
      Required: 'Please enter your password.',
      minLength: {
        value: 8,
        message: 'Password is too short.',
      },
    },
  },
  getMuiErrorProps: (errors, name) => {
    const isValid = !Object.prototype.hasOwnProperty.call(errors, name);
    const result = {error: !isValid};
    if (!isValid) {
      result.helperText = errors[name].message;
    }
    return result;
  },
};

export default formValidation;
