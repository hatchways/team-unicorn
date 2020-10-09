import React, {useState, useContext, useEffect} from 'react';
import {Avatar, Button} from '@material-ui/core';
import BaseSnackBar from 'components/snackbars/BaseSnackbar';
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

      <BaseSnackBar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message="Profile Picture Updated!"
        severity="success"
      />
    </>
  );
};

export default ProfileAvatar;
