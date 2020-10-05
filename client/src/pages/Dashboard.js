import React from 'react';
import AppLayout from './layouts/AppLayout';
import KanbanBoard from './board/KanbanBoard';

import {BoardProvider} from '../contexts/boardContext';

const Dashboard = () => {
  // TODO: Wrap dashboard component with AppLayout.
  return (
    <AppLayout>
      <BoardProvider>
        <KanbanBoard />
      </BoardProvider>
    </AppLayout>
  );
};

export default Dashboard;
