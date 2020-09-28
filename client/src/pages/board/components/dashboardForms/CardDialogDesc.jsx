import {DialogContent, Typography} from '@material-ui/core';
import React from 'react';
import DescIcon from '@material-ui/icons/ImportContactsTwoTone';

const CardDialogDesc = ({children}) => {
  return (
    <DialogContent dividers>
      <DescIcon color="primary" />
      <Typography>{children}</Typography>
    </DialogContent>
  );
};

export default CardDialogDesc;
