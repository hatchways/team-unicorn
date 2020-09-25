import {IconButton, makeStyles} from '@material-ui/core';
import React from 'react';
import AddIcon from '@material-ui/icons/AddCircle';
import CenteringBox from '../CenteringBox';

const useStyles = makeStyles({
  root: {},
});

const AddColumn = ({open}) => {
  const classes = useStyles();
  return !open ? null : (
    <CenteringBox className={classes.root} bgcolor="#D8D8D8" height="100%">
      <IconButton>
        <AddIcon fontSize="large" />
      </IconButton>
    </CenteringBox>
  );
};

export default AddColumn;
