import React from 'react';
import AppLayout from './layouts/AppLayout';
import BoardState from '../contexts/board/boardState';

const Dashboard = () => {
  return (
    <BoardState>
      <AppLayout />
    </BoardState>
  );
};

export default Dashboard;
