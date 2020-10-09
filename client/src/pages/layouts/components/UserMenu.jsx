import React, {useState} from 'react';
import {Menu, MenuItem} from '@material-ui/core';
import AccountDialog from './AccountDialog';
import AvatarDialogForm from './AvatarDialogForm';
import LogOutButton from '../../auth/components/LogoutButton';

const UserMenu = ({anchorElem, setAvatar, setAnchorElem, setOpenSnackbar}) => {
  const [profileOpen, setProfileOpen] = useState({open: false, dialog: ''});

  const openProfile = (dialog) => {
    setProfileOpen({open: true, dialog});
  };

  const handleClose = () => {
    setProfileOpen({...profileOpen, open: false});
    setAnchorElem(null);
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
        <MenuItem onClick={() => openProfile('account')}>My account</MenuItem>
        <MenuItem onClick={() => openProfile('avatar')}>
          Edit Profile Picture
        </MenuItem>
        <MenuItem>
          {' '}
          <LogOutButton />{' '}
        </MenuItem>
      </Menu>

      {profileOpen.dialog === 'avatar' && (
        <AvatarDialogForm
          open={profileOpen.open === true}
          setAvatar={setAvatar}
          closeMenu={handleClose}
          setOpenSnackbar={setOpenSnackbar}
        />
      )}
      {profileOpen.dialog === 'account' && (
        <AccountDialog
          open={profileOpen.open === true}
          closeMenu={handleClose}
          setOpenSnackbar={setOpenSnackbar}
        />
      )}
    </>
  );
};

export default UserMenu;
