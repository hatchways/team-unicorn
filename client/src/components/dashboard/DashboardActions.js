import React, {useState, useEffect} from 'react';
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

  const loadData = async () => {
    const payload = await getBoard();

    setData(payload.data);
    setLoading(payload.loading);
    setError(payload.error);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className={classes.dashboardContainer}>
        <div className={classes.addColumnContainer} id="leftNav">
          {data?.columns ? (
            <AddColumn
              data={data}
              setData={setData}
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
            <div>
              <div className="boardText">
                <Typography variant="h4" color="primary">
                  {data.name}
                </Typography>
              </div>
              <div className="columns">
                {data.columns.map((column) => (
                  // eslint-disable-next-line no-param-reassign, no-underscore-dangle
                  <Column column={column} key={column._id} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={classes.addColumnContainer} id="rightNav">
          {data?.columns ? (
            <AddColumn
              // eslint-disable-next-line no-param-reassign, no-underscore-dangle
              boardId={data._id}
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
