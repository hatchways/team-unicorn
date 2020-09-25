import {Grid, makeStyles} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const Board = () => {
  const classes = useStyles();
  return (
    <Grid
      direction="row"
      container
      className={classes.root}
      alignItems="stretch"
    >
      <Grid item xs={1} style={{backgroundColor: 'lightblue'}} />
      <Grid item style={{backgroundColor: 'lightcyan'}} />
      <Grid item xs={1} style={{backgroundColor: 'lightcoral'}} />
    </Grid>
  );
};

export default Board;
