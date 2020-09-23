import React from 'react';

const UserContext = React.createContext({
  user: null,
  setAuthenticated: () => {},
  setUser: () => {},
});

export default UserContext;
