import React from 'react';
import {DropzoneDialog} from 'material-ui-dropzone';
import axios from 'axios';

const AvatarDialogForm = (props) => {
  const {open} = props;

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSave = (file) => {
    const formData = new FormData();
    formData.append('avatar', file[0]);
    axios.put('user/avatar', formData);
  };

  // return (
  //   <Dialog open={open} onClose={handleClose}>
  //     <DialogContent>
  //       <IconButton
  //         aria-label="close"
  //         className="closeButton"
  //         onClick={handleClose}
  //       >
  //         <CloseIcon />
  //       </IconButton>
  //       <Typography variant="h4">Upload A New Avatar!</Typography>
  //       <DropzoneArea
  //         acceptedFiles={['image/*']}
  //         dropzoneText="Drag and drop an image here or click"
  //       />
  //     </DialogContent>
  //   </Dialog>
  // );

  return (
    <DropzoneDialog
      open={open}
      onSave={handleSave}
      acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
      showPreviews
      maxFileSize={5000000}
      onClose={handleClose}
    />
  );
};

export default AvatarDialogForm;
