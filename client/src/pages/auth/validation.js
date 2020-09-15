const validation = {
  // NOTE: Only a simple validation, the reason is discussed here:
  // https://stackoverflow.com/a/815232/3402183
  validateEmail: (email) => {
    const re = new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$', 'i');
    return re.test(email);
  },
  // validatePassword: (password, confirmPassword) => true,
};

export default validation;
