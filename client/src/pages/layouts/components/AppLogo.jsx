import {makeStyles} from '@material-ui/core';
import React from 'react';
import logo from '../../static/logo.png';

const useStyles = makeStyles({
  root: {
    height: '50%',
  },
  img: {
    maxHeight: '100%',
    width: 'auto',
    objectFit: 'contain',
  },
});

const AppLogo = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.img} src={logo} alt="KanBan Logo" />
    </div>
  );
};

export default AppLogo;
