import {Box, Typography, makeStyles} from '@material-ui/core';
import React from 'react';
import MenuButton from './MenuButton';

const useStyles = makeStyles({
  root: {
    opacity: '60%',
  },
});

const CardDialogButtonMenu = ({handleAdd}) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      justifyContent="space-evenly"
      height="100%"
    >
      <Box marginBottom={3}>
        <Typography variant="subtitle2">ADD TO CARD:</Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-evenly"
          paddingX={2}
        >
          <MenuButton onClick={() => handleAdd('tags')}>Tag</MenuButton>
          <MenuButton onClick={() => handleAdd('checklist')}>
            Checklist
          </MenuButton>
          <MenuButton onClick={() => handleAdd('deadline')}>
            Deadline
          </MenuButton>
          <MenuButton onClick={() => handleAdd('attachment')}>
            Attachment
          </MenuButton>
          <MenuButton onClick={() => handleAdd('attachment')}>Cover</MenuButton>
        </Box>
      </Box>
      <div>
        <Typography variant="subtitle2">ACTIONS:</Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-evenly"
          paddingX={2}
        >
          <MenuButton>Move</MenuButton>
          <MenuButton>Copy</MenuButton>
          <MenuButton>Share</MenuButton>
          <MenuButton>Delete</MenuButton>
        </Box>
      </div>
    </Box>
  );
};

export default CardDialogButtonMenu;
