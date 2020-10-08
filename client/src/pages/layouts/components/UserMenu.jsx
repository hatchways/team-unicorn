import React, {useState, useCallback, useContext} from 'react';
import {Menu, MenuItem} from '@material-ui/core';
import User from 'api/User';
import AvatarDialogForm from './AvatarDialogForm';
import UserContext from '../../../contexts';

const UserMenu = ({anchorElem, setAvatar, setAnchorElem, setOpenSnackbar}) => {
  const [profileOpen, setProfileOpen] = useState(false);

  const openProfile = () => {
    setProfileOpen(true);
  };

  const handleClose = () => {
    setProfileOpen(false);
    setAnchorElem(null);
  };

  const userContext = useContext(UserContext);
  const handleLogout = useCallback(async () => {
    const {success, errors} = await User.endSession();
    if (success) {
      userContext.setUser(null);
      userContext.setAuthenticated(false);
    } else {
      console.log(errors);
      // TODO: Display snackbar
    }
  }, [userContext]);

  return (
    <>
      <Menu
        anchorEl={anchorElem}
        keepMounted
        open={Boolean(anchorElem)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
      >
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={openProfile}>Edit Profile Picture</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {profileOpen && (
        <AvatarDialogForm
          open={profileOpen}
          setAvatar={setAvatar}
          closeMenu={handleClose}
          setOpenSnackbar={setOpenSnackbar}
        />
      )}
    </>
  );
};

export default UserMenu;
