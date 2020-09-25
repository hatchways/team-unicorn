import React, {Fragment, useState, useEffect} from 'react';
import {Typography} from '@material-ui/core/';
import dashboardStyles from '../styles/DashboardStyles';
import getBoard from '../../api/Board';

import AddColumn from './AddColumn';
import Column from './Column';

const DashboardActions = () => {
  const classes = dashboardStyles();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadBoard, setLoadBoard] = useState(true);

  const loadData = async () => {
    const payload = await getBoard();

    setData(payload.data);
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
          {data?.columns ? (
            <AddColumn
              data={data}
              setData={setData}
              setLoadBoard={setLoadBoard}
              // eslint-disable-next-line no-param-reassign, no-underscore-dangle
              boardId={data._id}
            />
          ) : (
            ' '
          )}
        </div>
        <div className={classes.columnsContainer}>
          {error && <div>Something went wrong. Please try again!!!</div>}
          {loading && <div>Loading ...</div>}
          {data?.columns.length > 0 && (
            // eslint-disable-next-line react/jsx-fragments
            <Fragment>
              <div className="boardText">
                <Typography variant="h4" color="primary">
                  {data.name}
                </Typography>
              </div>
              <div className="columns">
                {data.columns.map((column) => (
                  <Column
                    setLoadBoard={setLoadBoard}
                    column={column}
                    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
                    key={column._id}
                  />
                ))}
              </div>
            </Fragment>
          )}
        </div>
        <div className={classes.addColumnContainer} id="rightNav">
          {data?.columns ? (
            <AddColumn
              // eslint-disable-next-line no-param-reassign, no-underscore-dangle
              boardId={data._id}
              setLoadBoard={setLoadBoard}
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
