import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(5),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(5),
  },
  appBar: {
    marginBottom: theme.spacing(3),
  },
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Toolbar>
          <Typography variant="h4" className={classes.title} color="secondary">
            My School Board
          </Typography>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="secondary"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
