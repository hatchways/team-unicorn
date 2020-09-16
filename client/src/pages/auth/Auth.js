import {Grid, makeStyles, Box} from '@material-ui/core';
import React from 'react';
import AuthImg from './authPageImg.png';
import CenteringBox from '../../components/CenteringBox';
import AuthFormContainer from './components/AuthFormContainer';

const useStyles = makeStyles({
  root: {
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

const Auth = ({formComponent, footerComponent, title}) => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
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
        className={classes.formCol}
        md
        xs={12}
      >
        <CenteringBox flexGrow={1}>
          <AuthFormContainer title={title}>{formComponent}</AuthFormContainer>
        </CenteringBox>
        <CenteringBox
          className={classes.footer}
          borderTop={1}
          borderColor="grey.300"
        >
          {footerComponent}
        </CenteringBox>
      </Grid>
    </Grid>
  );
};

export default Auth;
