import React from 'react';
import KanbanBoard from './board/KanbanBoard';
import AppLayout from './layouts/AppLayout';

const Dashboard = () => {
  return (
    <AppLayout>
      <KanbanBoard />
    </AppLayout>
  );
};

export default Dashboard;
