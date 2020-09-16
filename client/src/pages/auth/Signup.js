import React from 'react';
import Auth from './Auth';
import SignupFooter from './components/SignupFooter';
import SignupForm from './components/SignupForm';

const Signup = () => {
  return (
    <Auth
      formComponent={<SignupForm />}
      footerComponent={<SignupFooter />}
      title="Welcome to KanBan!"
    />
  );
};
export default Signup;
