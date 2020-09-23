import {Grid, makeStyles, Box, Hidden} from '@material-ui/core';
import React from 'react';
import AuthImg from './authPageImg.png';
import CenteringBox from '../../components/CenteringBox';

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

// TODO:  Instead of hiding picture on small screens,
//        consider putting it in bg.
//        Also consider debouncing and moving components
//        dynamically (i.e. smoothly) upon resize.
const AuthLayout = ({children}) => {
  const classes = useStyles();

  const formComponent = children.filter((comp) => comp.key === 'form');
  const footerComponent = children.filter((comp) => comp.key === 'footer');

  return (
    <Grid
      className={classes.root}
      direction="row"
      alignItems="stretch"
      container
    >
      <Hidden smDown>
        <Grid item md className={classes.imgCol}>
          <img className={classes.img} src={AuthImg} alt="KanBan Homepage" />
        </Grid>
      </Hidden>

      <Grid
        item
        component={Box}
        display="flex"
        flexDirection="column"
        className={classes.formCol}
        md
        xs={12}
      >
        <CenteringBox flexGrow={1}>{formComponent}</CenteringBox>
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

export default AuthLayout;
