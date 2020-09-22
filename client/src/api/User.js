import axios from 'axios';

// const sampleUser = {
//   name: 'John Doe',
//   email: 'aaa@mail.com',
//   password: 'password',
//   confirmPassword: 'password',
// };

// NOTE: Axios throws an error on
// response headers outside of 2xx.
// We leverage this by try-catch blocks.

const User = {
  // TODO: Implement error handling ~
  // TODO: Standardize an ApiResult object for return values

  create: async (data) => {
    try {
      const {
        data: {user},
      } = await axios.post('/user/create', data);
      const success = true;
      return {success, user};
    } catch (err) {
      const success = false;
      const {message} = err.body;
      return {success, message};
    }
  },
  authenticate: async (data) => {
    try {
      const resp = await axios.post('/user/authenticate', data);
      const success = true;
      const {user} = resp.data;
      return {success, user};
    } catch (err) {
      // HandleError;
      const success = false;
      const {message} = err.response.data;
      return {success, message};
    }
  },
  extendSession: async () => {
    try {
      await axios.post('/user/session/extend');
      return true;
    } catch (err) {
      // HandleError
      return false;
    }
  },
  resolveSession: async () => {
    try {
      const resp = await axios.get('/user/session/resolve');
      const success = true;
      const {user} = resp.data;
      return {success, user};
    } catch (err) {
      // Handle Error
      const success = false;
      const {message} = err.response.data;
      return {success, message};
    }
  },
  endSession: async () => {
    try {
      await axios.post('/user/session/end');
      return true;
    } catch (err) {
      // Handle Error
      return false;
    }
  },
};

export default User;
