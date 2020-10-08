import React from 'react';
import {Snackbar, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const BaseSnackBar = ({open, message, onClose}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      message={message}
      action={
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  );
};

export default BaseSnackBar;
