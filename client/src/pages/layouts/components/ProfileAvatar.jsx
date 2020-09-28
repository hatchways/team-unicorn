import {Avatar, Button} from '@material-ui/core';
import React, {useState} from 'react';
import UserContext from '../../../contexts';
// import sampleAvatar from '../../static/sampleAvatar.png';
import AvatarDialogFrom from './AvatarDialogForm';

const ProfileAvatar = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <UserContext.Consumer>
          {(value) => <Avatar alt="UserName" src={value.user.avatar} />}
        </UserContext.Consumer>
      </Button>
      {open && <AvatarDialogFrom open={open} setOpen={setOpen} />}
    </div>
  );
};

export default ProfileAvatar;
