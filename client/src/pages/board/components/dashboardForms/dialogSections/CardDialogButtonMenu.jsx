import React, {useMemo} from 'react';
import {Box, Typography, makeStyles} from '@material-ui/core';
import MenuButton from './components/MenuButton';
import SectionInfos from './enums';

const useStyles = makeStyles({
  root: {
    opacity: '60%',
  },
});

const CardDialogButtonMenu = ({handleAdd}) => {
  const classes = useStyles();
  const AddSectionButtons = useMemo(
    () =>
      Object.keys(SectionInfos).map((sectionCode) => {
        const {title} = SectionInfos[sectionCode];
        return (
          <MenuButton key={sectionCode} onClick={() => handleAdd(sectionCode)}>
            {title}
          </MenuButton>
        );
      }),
    [handleAdd],
  );
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
          {AddSectionButtons}
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
