import React from 'react';
import {DropzoneDialog} from 'material-ui-dropzone';
import axios from 'axios';

const AvatarDialogForm = (props) => {
  const {open, setAvatar, closeMenu} = props;

  const handleClose = () => {
    // setOpen(false);
    closeMenu();
  };

  const handleSave = (file) => {
    const formData = new FormData();
    formData.append('avatar', file[0]);
    axios
      .put('user/avatar', formData)
      .then((resp) => setAvatar(resp.data.avatar))
      .then(() => handleClose());
  };

  return (
    <DropzoneDialog
      open={open}
      onSave={handleSave}
      acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
      filesLimit={1}
      showPreviews
      maxFileSize={5000000}
      onClose={handleClose}
    />
  );
};

export default AvatarDialogForm;
