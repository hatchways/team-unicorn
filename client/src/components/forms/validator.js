const formValidation = {
  addColumn: {
    title: {
      required: 'Please enter title',
    },
  },
  editCard: {
    description: {
      required: 'Please enter description',
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
