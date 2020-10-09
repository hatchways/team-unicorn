import React, {useState} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  appBar: {
    paddingLeft: theme.spacing(theme.pageIndent),
    paddingRight: theme.spacing(theme.pageIndent),
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={classes.appBar} elevation={0}>
      <Toolbar disableGutters>
        <Typography variant="h6" className={classes.title} color="inherit">
          My School Board
        </Typography>
        <IconButton
          edge="end"
          aria-label="menu"
          color="inherit"
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          variant="menu"
          open={open}
          onClose={handleClose}
        />
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
