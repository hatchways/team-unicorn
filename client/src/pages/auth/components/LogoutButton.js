import {Button} from '@material-ui/core';
import React, {useContext, useCallback} from 'react';
import User from '../../../api/User';
import UserContext from '../../../contexts';

const LogoutButton = () => {
  const userContext = useContext(UserContext);
  const handleLogout = useCallback(async () => {
    const {success, errors} = await User.endSession();
    if (success) {
      userContext.setUser(null);
      userContext.setAuthenticated(false);
    } else {
      console.log(errors);
      // TODO: Display toaster
    }
  }, [userContext]);
  return (
    <Button onClick={handleLogout} variant="contained">
      Logout
    </Button>
  );
};

export default LogoutButton;
