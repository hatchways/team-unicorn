import {Grid, makeStyles, Typography, Box, Link} from '@material-ui/core';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import AuthForm from './AuthForm';
import AuthImg from './auth-side-img.png';
import CenteringBox from '../../components/CenteringBox';

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
          <AuthForm />
        </Box>
        <CenteringBox
          className={classes.footer}
          borderTop={1}
          borderColor="grey.300"
        >
          <Typography variant="body1" align="center">
            Already have an account? <br />
            <Link component={RouterLink} to="/login" color="primary">
              Login
            </Link>
          </Typography>
        </CenteringBox>
      </Grid>
    </Grid>
  );
};

export default Auth;
