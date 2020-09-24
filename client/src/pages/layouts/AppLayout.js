import React from 'react';
import {Box, makeStyles} from '@material-ui/core';
import NavBar from './NavBar';
import AppLogo from './AppLogo';
import SwitchView from './SwitchView';
import CenteringBox from '../../components/CenteringBox';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'lightgrey',
  },
  header: {
    backgroundColor: 'white',
  },
  logoContainer: {
    paddingLeft: theme.spacing(theme.pageIndent),
  },
  appBar: {
    backgroundColor: 'lightblue',
  },
  content: {
    backgroundColor: 'lightgreen',
  },
}));

const AppLayout = () => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      className={classes.root}
    >
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
          className={classes.header}
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
            <SwitchView />
          </CenteringBox>
          <Box
            boxSizing="border-box"
            flexBasis="30%"
            flexGrow={1}
            bgcolor="orange"
          >
            {/* <CreateBoardButton />
            <ProfileHeader /> */}
          </Box>
        </Box>
        <Box flexGrow={1} className={classes.appBar}>
          <NavBar />
        </Box>
      </Box>
      <Box flexGrow={1} className={classes.content} />
    </Box>
  );
};

export default AppLayout;
