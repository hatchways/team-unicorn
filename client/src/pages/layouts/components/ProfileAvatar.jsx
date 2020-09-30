import {Avatar, Button} from '@material-ui/core';
import React, {useState} from 'react';
import UserContext from '../../../contexts';
import UserMenu from './UserMenu';

const ProfileAvatar = () => {
  const [anchorElem, setAnchorElem] = useState(null);
  const [avatar, setAvatar] = useState('');

  const handleClickOpen = (event) => {
    setAnchorElem(event.currentTarget);
  };

  return (
    <div>
      <UserContext.Consumer>
        {(value) => {
          if (value.user) {
            if (avatar === '') {
              setAvatar(value.user.avatar);
            }
            return (
              <div>
                <Button onClick={handleClickOpen}>
                  <Avatar
                    alt={value.user.name}
                    src={avatar || value.user.avatar}
                  />
                </Button>

                {Boolean(anchorElem) && (
                  <UserMenu
                    anchorElem={anchorElem}
                    setAnchorElem={setAnchorElem}
                    setAvatar={setAvatar}
                  />
                )}
              </div>
            );
          }
          return <div />;
        }}
      </UserContext.Consumer>
    </div>
  );
};

export default ProfileAvatar;
