import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    // marginLeft: theme.spacing(theme.pageIndent),
  },
  appBar: {
    marginBottom: theme.spacing(3),
    paddingLeft: theme.spacing(theme.pageIndent),
    paddingRight: theme.spacing(theme.pageIndent),
  },
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBar} elevation={0}>
      <Toolbar disableGutters>
        <Typography variant="h6" className={classes.title} color="inherit">
          My School Board
        </Typography>
        <IconButton edge="end" aria-label="menu" color="inherit">
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
