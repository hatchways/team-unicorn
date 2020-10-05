import React from 'react';
import AppLayout from './layouts/AppLayout';
import KanbanBoard from './board/KanbanBoard';

const Dashboard = () => {
  // TODO: Wrap dashboard component with AppLayout.
  return (
    <AppLayout>
      <KanbanBoard />
    </AppLayout>
  );
};

export default Dashboard;
