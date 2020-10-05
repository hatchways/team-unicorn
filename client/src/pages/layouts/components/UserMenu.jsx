import React, {useState} from 'react';
import {Menu, MenuItem} from '@material-ui/core';
import AvatarDialogForm from './AvatarDialogForm';
import LogOutButton from '../../auth/components/LogoutButton';

const UserMenu = ({anchorElem, setAvatar, setAnchorElem, setOpenSnackbar}) => {
  const [profileOpen, setProfileOpen] = useState(false);

  const openProfile = () => {
    setProfileOpen(true);
  };

  const handleClose = () => {
    setAnchorElem(null);
    setOpenSnackbar(true);
  };

  return (
    <>
      <Menu
        id="simple-menu"
        anchorEl={anchorElem}
        keepMounted
        open={Boolean(anchorElem)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        transformOrigin={{vertical: 'top', horizontal: 'center'}}
      >
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={openProfile}>Edit Profile Picture</MenuItem>
        <MenuItem>
          {' '}
          <LogOutButton />{' '}
        </MenuItem>
      </Menu>

      {profileOpen && (
        <AvatarDialogForm
          open={profileOpen}
          setAvatar={setAvatar}
          closeMenu={handleClose}
        />
      )}
    </>
  );
};

export default UserMenu;
