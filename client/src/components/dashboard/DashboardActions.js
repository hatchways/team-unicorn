import React, {useState, useEffect} from 'react';
import {Typography} from '@material-ui/core/';
import dashboardStyles from '../styles/DashboardStyles';
import getBoard from '../../api/Board';

import AddColumn from './AddColumn';
import Column from './Column';

const DashboardActions = () => {
  const classes = dashboardStyles();

  const [boardData, setBoardData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadBoard, setLoadBoard] = useState(true);

  const loadData = async () => {
    const payload = await getBoard();

    setBoardData(payload.data);
    setLoading(payload.loading);
    setError(payload.error);
    setLoadBoard(false);
  };

  useEffect(() => {
    if (loadBoard) loadData();
  }, [loadBoard]);

  return (
    <>
      <div className={classes.dashboardContainer}>
        <div className={classes.addColumnContainer} id="leftNav">
          {boardData?.columns ? (
            <AddColumn
              boardData={boardData}
              setBoardData={setBoardData}
              setLoadBoard={setLoadBoard}
              // eslint-disable-next-line no-param-reassign, no-underscore-dangle
              boardId={boardData._id}
            />
          ) : (
            ' '
          )}
        </div>
        <div className={classes.columnsContainer}>
          {error && <div>Something went wrong. Please try again!!!</div>}
          {loading && <div>Loading ...</div>}
          {boardData?.columns.length > 0 && (
            <>
              <div className="boardText">
                <Typography variant="h4" color="primary">
                  {boardData.name}
                </Typography>
              </div>
              <div className="columns">
                {boardData.columns
                  .map((column) => (
                    <Column
                      setLoadBoard={setLoadBoard}
                      column={column}
                      // eslint-disable-next-line no-param-reassign, no-underscore-dangle
                      key={column._id}
                    />
                  ))
                  .reverse()}
              </div>
            </>
          )}
        </div>
        <div className={classes.addColumnContainer} id="rightNav">
          {boardData?.columns ? (
            <AddColumn
              boardData={boardData}
              setBoardData={setBoardData}
              setLoadBoard={setLoadBoard}
              // eslint-disable-next-line no-param-reassign, no-underscore-dangle
              boardId={boardData._id}
            />
          ) : (
            ' '
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardActions;
