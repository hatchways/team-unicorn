import {ButtonBase, Box, makeStyles, useTheme} from '@material-ui/core';
import React from 'react';
import AddIcon from '@material-ui/icons/AddCircleOutlineRounded';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
  },
});

const AddColumn = ({show}) => {
  const classes = useStyles();
  const theme = useTheme();
  return !show ? null : (
    <Box
      component={ButtonBase}
      classes={{root: classes.root}}
      bgcolor={theme.palette.hovering.main}
      color={theme.palette.hovering.contrastText}
      height="100%"
      onClick={() => console.log('hello')}
    >
      <AddIcon fontSize="large" color="inherit" />
    </Box>
  );
};

export default AddColumn;
