import React from 'react';

import NavBar from '../components/layout/NavBar';
import LogoutButton from './auth/components/LogoutButton';

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
