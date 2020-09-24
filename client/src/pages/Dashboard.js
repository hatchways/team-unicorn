import React from 'react';

import NavBar from '../components/layout/NavBar';
import CenteringBox from '../components/CenteringBox';
import Board from './draft-board-ui';

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <CenteringBox>
        <Board />
      </CenteringBox>
    </div>
  );
};

export default Dashboard;
