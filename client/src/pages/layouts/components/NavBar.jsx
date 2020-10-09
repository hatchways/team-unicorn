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

import {BoardContext} from 'contexts/boardContext';
import {convertBoardAPI} from 'api/Utils';

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
    marginBottom: theme.spacing(3),
    paddingLeft: theme.spacing(theme.pageIndent),
    paddingRight: theme.spacing(theme.pageIndent),
  },
}));

const NavBar = () => {
  const {data, dispatch} = useContext(BoardContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = async (event) => {
    const idx = await event.target.getAttribute('value');
    const newBoard = await data.boards[idx];

    // const board = data.view === 'dashboard' ?  : await convertCalendarAPI(newBoard)
    dispatch({
      board: await convertBoardAPI(newBoard),
      type: 'SWITCH_BOARD',
    });
    // reducers.switchBoard(board, dispatch)
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
          {data.boards.filter((val) => val.id === data.boardView.id)[0]?.name}
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
            <Typography>Switch Board</Typography>
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
                      {data.boards.map((board, idx) => (
                        <MenuItem
                          onClick={handleClose}
                          // eslint-disable-next-line no-param-reassign, no-underscore-dangle
                          value={idx}
                          // eslint-disable-next-line no-param-reassign, no-underscore-dangle
                          key={board.id}
                        >
                          {board.name}
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
