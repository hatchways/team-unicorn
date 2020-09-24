import React from 'react';

import NavBar from '../components/layout/NavBar';
import CenteringBox from '../components/CenteringBox';
import Board from './draft-board-ui';

const Dashboard = () => {
  return (
    <CenteringBox>
      <NavBar />
      <Board />
    </CenteringBox>
  );
};

export default Dashboard;
