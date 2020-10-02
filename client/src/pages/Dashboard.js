import React from 'react';
import KanbanBoard from './board/KanbanBoard';
import AppLayout from './layouts/AppLayout';

import { BoardProvider } from '../contexts/boardContext';


const Dashboard = () => {
  return (
    <AppLayout>
      <BoardProvider>
        <KanbanBoard />
      </BoardProvider>
    </AppLayout>
  );
};

export default Dashboard;
