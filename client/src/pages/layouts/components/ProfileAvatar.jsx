import {Avatar, Button} from '@material-ui/core';
import React, {useState} from 'react';
import sampleAvatar from '../../static/sampleAvatar.png';
import AvatarDialogFrom from './AvatarDialogForm';

const ProfileAvatar = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <Avatar alt="UserName" src={sampleAvatar} />
      </Button>
      {open && <AvatarDialogFrom open={open} setOpen={setOpen} />}
    </div>
  );
};

export default ProfileAvatar;
