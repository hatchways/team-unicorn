import React, {useState, useCallback, useContext} from 'react';
import {Menu, MenuItem} from '@material-ui/core';
import AccountDialog from './AccountDialog';
import AvatarDialogForm from './AvatarDialogForm';
import {BoardProvider} from '../../../contexts/boardContext';
import UserContext from 'contexts';
import User from 'api/User';

const UserMenu = ({anchorElem, setAvatar, setAnchorElem, setOpenSnackbar}) => {
  const [profileOpen, setProfileOpen] = useState({open: false, dialog: ''});

  const openProfile = (dialog) => {
    setProfileOpen({open: true, dialog});
  };

  const handleClose = () => {
    setProfileOpen({...profileOpen, open: false});
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
    <BoardProvider >
      <Menu
        anchorEl={anchorElem}
        keepMounted
        open={Boolean(anchorElem)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
      >
        <MenuItem onClick={() => openProfile('account')}>My account</MenuItem>
        <MenuItem onClick={() => openProfile('avatar')}>
          Edit Profile Picture
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          {'Logout '}
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
    </BoardProvider>
    </>
  );
};

export default UserMenu;
