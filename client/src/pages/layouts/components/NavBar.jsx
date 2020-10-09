import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from '@material-ui/core/';

import BoardContext from '../../../contexts/board/boardContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    zindex: '1',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    // marginLeft: theme.spacing(theme.pageIndent),
  },
  appBar: {
    paddingLeft: theme.spacing(theme.pageIndent),
    paddingRight: theme.spacing(theme.pageIndent),
  },
}));

const NavBar = () => {
  const {boards, board, ChangeBoard} = useContext(BoardContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    const boardId = event.target.getAttribute('value');
    if (boardId !== null) {
      ChangeBoard(boardId);
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <AppBar position="static" className={classes.appBar} elevation={0}>
      <Toolbar disableGutters>
        <Typography variant="h6" className={classes.title} color="inherit">
          {board?.name}
        </Typography>
        <div>
          <IconButton
            aria-label="menu"
            color="inherit"
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            disableRipple
          >
            <Typography>Board</Typography>
            <ArrowDropDownIcon />
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
          >
            {({TransitionProps, placement}) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      {boards.map((b) => (
                        <MenuItem
                          onClick={handleClose}
                          // eslint-disable-next-line no-param-reassign, no-underscore-dangle
                          value={b._id}
                          // eslint-disable-next-line no-param-reassign, no-underscore-dangle
                          key={b._id}
                        >
                          {b.name}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
