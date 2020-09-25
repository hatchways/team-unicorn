import React from 'react';
import AppLayout from './layouts/AppLayout';
import DashboardActions from '../components/dashboard/DashboardActions';

const Dashboard = () => {
  // TODO: Wrap dashboard component with AppLayout.
  return (
    <AppLayout>
      <DashboardActions />
    </AppLayout>
  );
};

export default Dashboard;
