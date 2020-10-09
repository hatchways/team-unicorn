import React from 'react';
import {BoardProvider} from 'contexts/boardContext';
import AppLayout from './layouts/AppLayout';

const Dashboard = () => {
  return (
    <BoardProvider>
      <AppLayout />
    </BoardProvider>
  );
};

export default Dashboard;
