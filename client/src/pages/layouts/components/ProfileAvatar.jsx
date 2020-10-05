import React, {useState, useContext, useEffect} from 'react';
import {Avatar, Button, IconButton, Snackbar} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import UserContext from '../../../contexts';
import UserMenu from './UserMenu';

const ProfileAvatar = () => {
  const {user} = useContext(UserContext);
  const [anchorElem, setAnchorElem] = useState(null);
  const [avatar, setAvatar] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar);
    }
  }, [user]);

  return (
    <>
      <Button onClick={(event) => setAnchorElem(event.currentTarget)}>
        <Avatar alt="Unicorn" src={avatar} />
      </Button>
      {Boolean(anchorElem) && (
        <UserMenu
          anchorElem={anchorElem}
          setAnchorElem={setAnchorElem}
          setAvatar={setAvatar}
          setOpenSnackbar={setOpenSnackbar}
        />
      )}
      {/* Would like to put this in a separate file but not sure where to place it since its just for a very specific use case 
          Will probably move once we have more snackbars in dev */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Profile Picture Updated!"
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setOpenSnackbar(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />{' '}
    </>
  );
};

export default ProfileAvatar;
