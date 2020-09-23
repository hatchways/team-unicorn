import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const AuthRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !authed ? (
          <Component {...props} />
        ) : (
          <Redirect to={{pathname: '/empty', state: {from: props.location}}} />
        )
      }
    />
  );
};

export default AuthRoute;
