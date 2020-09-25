import {Avatar} from '@material-ui/core';
import React from 'react';
import sampleAvatar from '../../static/sampleAvatar.png';

const ProfileAvatar = () => {
  return <Avatar alt="UserName" src={sampleAvatar} />;
};

export default ProfileAvatar;
