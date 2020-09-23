import React from 'react';
import {Box, makeStyles} from '@material-ui/core';
import NavBar from '../components/layout/NavBar';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'lightgrey',
  },
  header: {
    backgroundColor: 'white',
  },
  appBar: {
    backgroundColor: 'lightblue',
  },
  content: {
    backgroundColor: 'lightgreen',
  },
});

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
          display="flex"
          flexDirection="row"
          flexGrow={1}
          minHeight="5rem"
          maxHeight="60%"
          alignItems="stretch"
          className={classes.header}
        >
          <Box flexGrow={1} bgcolor="blue" />
          <Box flexGrow={1} bgcolor="red" />
          <Box flexGrow={1} bgcolor="orange" />
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
