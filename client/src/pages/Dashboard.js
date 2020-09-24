import React from 'react';
import KanbanBoard from './KanbanBoard';
import AppLayout from './layouts/AppLayout';

const Dashboard = () => {
  return (
    <AppLayout>
      <KanbanBoard />
    </AppLayout>
  );
};

export default Dashboard;
