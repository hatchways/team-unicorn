import React from 'react';
import {Box, makeStyles} from '@material-ui/core';
import NavBar from './components/NavBar';
import AppLogo from './components/AppLogo';
import SwitchView from './components/SwitchView';
import CenteringBox from '../../components/CenteringBox';
import CreateBoard from './components/CreateBoard';
import ProfileAvatar from './components/ProfileAvatar';

const useStyles = makeStyles((theme) => ({
  logoContainer: {
    paddingLeft: theme.spacing(theme.pageIndent),
  },
  avatarContainer: {
    paddingLeft: theme.spacing(theme.pageIndent),
    paddingRight: theme.spacing(theme.pageIndent),
  },
}));

const AppLayout = ({
  children,
  boards,
  currentBoard,
  setCurrentBoard,
  setCurrentView,
  setBoards,
}) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box
        display="flex"
        flexGrow={1}
        minHeight="9rem"
        maxHeight="15%"
        flexDirection="column"
      >
        <Box
          component="header"
          display="flex"
          flexDirection="row"
          flexGrow={1}
          minHeight="5rem"
          maxHeight="60%"
          alignItems="stretch"
        >
          <Box
            className={classes.logoContainer}
            display="flex"
            alignItems="center"
            boxSizing="border-box"
            flexBasis="30%"
            flexGrow={1}
          >
            <AppLogo />
          </Box>
          <CenteringBox boxSizing="border-box" flexBasis="40%" flexGrow={1}>
            <SwitchView setCurrentView={setCurrentView} />
          </CenteringBox>
          <Box
            display="flex"
            alignItems="stretch"
            justifyContent="space-between"
            boxSizing="border-box"
            flexBasis="30%"
            flexGrow={1}
          >
            <CenteringBox flexGrow={1}>
              <CreateBoard setBoards={setBoards} />
            </CenteringBox>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              className={classes.avatarContainer}
            >
              <ProfileAvatar />
            </Box>
          </Box>
        </Box>
        <Box flexGrow={1}>
          <NavBar
            boards={boards}
            currentBoard={currentBoard}
            setCurrentBoard={setCurrentBoard}
          />
        </Box>
      </Box>
      <Box flexGrow={1}>{children}</Box>
    </Box>
  );
};

export default AppLayout;
