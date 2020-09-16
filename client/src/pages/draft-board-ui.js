import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#cfe8fc',
    height: '100vh'
  },
  column: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    height: '100vh',
    maxHeight: '1000px',
    width: 200,
    backgroundColor: '#4791db',
    border: '2px solid green'
  },
  card: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function NestedGrid() {
  const classes = useStyles();

  function Tasks() {
    return (
      <React.Fragment>
          <Card className={classes.card}>item</Card>
          <Card className={classes.card}>item</Card>
          <Card className={classes.card}>item</Card>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} spacing={1}>
        <Grid className={classes.column} item xs={12} spacing={4}>
          <Tasks />
        </Grid>
        <Grid className={classes.column} item xs={12} spacing={4}>
          <Tasks />
        </Grid>
        <Grid className={classes.column} item xs={12} spacing={4}>
          <Tasks />
        </Grid>
        <Grid className={classes.column} item xs={12} spacing={4}>
          <Tasks />
        </Grid>
        <Grid className={classes.column} item xs={12} spacing={4}>
          <Tasks />
        </Grid>
      </Grid>
    </div>
  );
}