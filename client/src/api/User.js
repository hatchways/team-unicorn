import axios from 'axios';
import ApiResultFactory from './ApiResult';

// const sampleUser = {
//   name: 'John Doe',
//   email: 'aaa@mail.com',
//   password: 'password',
//   confirmPassword: 'password',
// };

// NOTE: Axios throws an error on
// response headers outside of 2xx.
// We leverage this by try-catch blocks.

const defaultErrorHandler = (error) => {
  // Check if error is axios error
  if (error.response) {
    const {errors} = error.response.data;
    return ApiResultFactory.withErrors(errors);
  }

  console.log(error.message);
  return {};
};

const User = {
  create: async (data) => {
    try {
      const {data: respData} = await axios.post('/user/create', data);
      return ApiResultFactory.withData(respData);
    } catch (err) {
      return defaultErrorHandler(err);
    }
  },
  authenticate: async (data) => {
    try {
      const {data: respData} = await axios.post('/user/authenticate', data);
      return ApiResultFactory.withData(respData);
    } catch (err) {
      return defaultErrorHandler(err);
    }
  },
  extendSession: async () => {
    try {
      await axios.post('/user/session/extend');
      return ApiResultFactory.success();
    } catch (err) {
      return defaultErrorHandler(err);
    }
  },
  resolveSession: async () => {
    try {
      const {data: respData} = await axios.get('/user/session/resolve');
      return ApiResultFactory.withData(respData);
    } catch (err) {
      return defaultErrorHandler(err);
    }
  },
  endSession: async () => {
    try {
      await axios.post('/user/session/end');
      return ApiResultFactory.success();
    } catch (err) {
      return defaultErrorHandler(err);
    }
  },
};

export default User;
