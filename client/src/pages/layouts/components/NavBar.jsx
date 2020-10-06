import React, {useState, useContext, useCallback} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import UserContext from '../../../contexts';
import User from '../../../api/User';
import LogoutButton from '../../auth/components/LogoutButton';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  appBar: {
    marginBottom: theme.spacing(3),
    paddingLeft: theme.spacing(theme.pageIndent),
    paddingRight: theme.spacing(theme.pageIndent),
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const userContext = useContext(UserContext);
  const handleLogout = useCallback(async () => {
    const {success} = await User.endSession();
    if (success) {
      userContext.setUser(null);
      userContext.setAuthenticated(false);
    }
    // else {
    //   //es-lint
    //   console.log(errors);
    //   // TODO: Display toaster
    // }
  }, [userContext]);

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
        <LogoutButton />
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
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
