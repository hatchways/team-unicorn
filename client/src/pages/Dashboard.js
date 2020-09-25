import React from 'react';

import NavBar from '../components/layout/NavBar';
import DashboardActions from '../components/dashboard/DashboardActions';
import LogoutButton from './auth/components/LogoutButton';

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <DashboardActions />
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
