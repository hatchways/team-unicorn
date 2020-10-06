import React from 'react';
import dashboardStyles from '../styles/DashboardStyles';

import AddColumn from './AddColumn';
import Column from './Column';

const DashboardActions = ({currentBoard}) => {
  const classes = dashboardStyles();

  return (
    <>
      <div className={classes.dashboardContainer}>
        <div className={classes.addColumnContainer} id="leftNav">
          <AddColumn currentBoard={currentBoard} />)
        </div>
        <div className={classes.columnsContainer}>
          <div className="columns">
            {currentBoard?.columns
              .map((column) => (
                <Column
                  column={column}
                  // eslint-disable-next-line no-param-reassign, no-underscore-dangle
                  key={column._id}
                />
              ))
              .reverse()}
          </div>
        </div>
        <div className={classes.addColumnContainer} id="rightNav">
          <AddColumn currentBoard={currentBoard} />
        </div>
      </div>
    </>
  );
};

export default DashboardActions;
