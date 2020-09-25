import React from 'react';
import AppLayout from './layouts/AppLayout';
import BoardContainer from '../components/board/BoardContainer';
import Board from '../components/board/Board';

const Dashboard = () => {
  // TODO: Wrap dashboard component with AppLayout.
  return (
    <AppLayout>
      <BoardContainer>
        <Board />
      </BoardContainer>
    </AppLayout>
  );
};

export default Dashboard;
