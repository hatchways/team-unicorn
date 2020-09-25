import React from 'react';
import {
  Typography,
  IconButton,
  Dialog,
  DialogContent,
} from '@material-ui/core/';

import CloseIcon from '@material-ui/icons/Close';
import {DropzoneArea} from 'material-ui-dropzone';

const AvatarDialogForm = (props) => {
  const {open} = props;

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <IconButton
          aria-label="close"
          className="closeButton"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4">Upload a new avatar</Typography>
        <DropzoneArea
          acceptedFiles={['image/*']}
          dropzoneText="Drag and drop an image here or click"
        />
      </DialogContent>
    </Dialog>
  );
};

export default AvatarDialogForm;
