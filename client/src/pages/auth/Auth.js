import {Grid, makeStyles, Typography, Box} from '@material-ui/core';
import React from 'react';
import AuthImg from './auth-side-img.png';
// import {Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles({
  pageContainer: {
    height: '100%',
  },
  img: {
    height: '100%',
    maxWidth: '100%',
    objectFit: 'cover',
    verticalAlign: 'middle',
  },
  imgCol: {
    height: '100%',
  },
  footer: {
    height: '100px',
    backgroundColor: 'black',
  },
});

// const title = 'Welcome to Kanban';

const Auth = () => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.pageContainer}
      direction="row"
      alignItems="stretch"
      container
    >
      <Grid className={classes.imgCol} item md xs={12}>
        <img className={classes.img} src={AuthImg} alt="" />
      </Grid>

      <Grid
        item
        component={Box}
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        className={classes.formCol}
        md
        xs={12}
      >
        <Box flexGrow={1}>
          <Typography variant="h1">grow</Typography>
        </Box>
        <Box className={classes.footer} />
      </Grid>
    </Grid>
  );
};

export default Auth;
