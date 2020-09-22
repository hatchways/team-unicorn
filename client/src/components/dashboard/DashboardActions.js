import React, {useState, useEffect} from 'react';

import dashboardStyles from '../styles/DashboardStyles';
import {getCurrentColumns} from '../../actions/column';

import AddColumn from './AddColumn';
import Column from './Column';

const DashboardActions = () => {
  const classes = dashboardStyles();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = async () => {
    const payload = await getCurrentColumns();

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
          <AddColumn />
        </div>
        <div className={classes.columnsContainer}>
          {error && <div>Something went wrong. Please try again!!!</div>}
          {loading && <div>Loading ...</div>}
          {data?.columns.length > 0 && (
            <div className="columns">
              {data.columns.map((column) => (
                <Column column={column} key={column.id} />
              ))}
            </div>
          )}
        </div>
        <div className={classes.addColumnContainer} id="rightNav">
          <AddColumn />
        </div>
      </div>
    </>
  );
};

export default DashboardActions;
