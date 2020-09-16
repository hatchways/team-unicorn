import React from 'react';
import Auth from './Auth';
import SignupForm from './components/SignupForm';

const Signup = () => {
  return <Auth formComponent={<SignupForm />} title="Welcome to KanBan!" />;
};
export default Signup;
