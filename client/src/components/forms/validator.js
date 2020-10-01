const formValidation = {
  addColumn: {
    title: {
      required: 'Please enter title',
    },
  },
  addCard: {
    title: {
      required: 'Please enter title',
    },
  },
  addBoard: {
    title: {
      required: 'Please enter title',
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
