import React, {useState} from 'react';
import {Button, IconButton, Menu, MenuItem, Snackbar} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AvatarDialogForm from './AvatarDialogForm';
import LogOutButton from '../../auth/components/LogoutButton';

const UserMenu = (props) => {
  const {anchorElem, setAnchorElem, setAvatar} = props;
  const [profileOpen, setProfileOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const openProfile = () => {
    setProfileOpen(true);
  };

  const handleClose = () => {
    setAnchorElem(null);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  return (
    <div>
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
          handleOpenSnackbar={handleOpenSnackbar}
        />
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Profile Picture Updated"
        action={
          <>
            <Button
              color="secondary"
              size="small"
              onClick={handleCloseSnackbar}
            >
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </div>
  );
};

export default UserMenu;
