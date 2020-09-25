import {Grid, makeStyles} from '@material-ui/core';
import React from 'react';
import AddColumn from './AddColumn';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
});

const BoardContainer = ({children}) => {
  const classes = useStyles();
  return (
    <Grid
      direction="row"
      className={classes.root}
      alignItems="stretch"
      container
    >
      <Grid item xs={1} style={{backgroundColor: 'lightblue'}}>
        <AddColumn />
      </Grid>
      <Grid item xs style={{backgroundColor: 'lightcyan'}}>
        {children}
      </Grid>
      <Grid item xs={1} style={{backgroundColor: 'lightcoral'}}>
        <AddColumn />
      </Grid>
    </Grid>
  );
};

export default BoardContainer;
