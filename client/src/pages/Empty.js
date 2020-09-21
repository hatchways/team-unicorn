import React, {useContext} from 'react';
import UserContext from '../contexts';

const Empty = () => {
  const {user} = useContext(UserContext);
  return (
    <div>
      <h1>Replace me with dashboard!</h1>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default Empty;
