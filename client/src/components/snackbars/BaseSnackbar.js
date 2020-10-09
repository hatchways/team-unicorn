import React from 'react';
import {Snackbar, Slide, IconButton} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

const BaseSnackBar = ({open, message, severity, onClose, ...otherProps}) => {
  const closeButton = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={onClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      key={message}
      open={open}
      autoHideDuration={6000}
      resumeHideDuration={500}
      transitionDuration={500}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      TransitionComponent={Slide}
      TransitionProps={{direction: 'down'}}
      onClose={onClose}
      {...otherProps}
    >
      <Alert
        severity={severity}
        variant="filled"
        elevation={6}
        action={closeButton}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default BaseSnackBar;
