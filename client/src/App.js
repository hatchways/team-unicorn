import React, {useState, useEffect} from 'react';
import {MuiThemeProvider} from '@material-ui/core';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import PrivateRoute from './components/PrivateRoute';
import UserContext from './contexts';
import {theme} from './themes/theme';

import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Empty from './pages/Empty';
import './App.css';
import User from './api/User';

function App() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [sessionResolved, setSessionResolved] = useState(false);

  const userContextValue = {user, setAuthenticated, setUser};
  useEffect(() => {
    const resolveAndAssignUser = async () => {
      const apiResult = await User.resolveSession();
      if (apiResult.success) {
        setUser(apiResult.user);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };

    resolveAndAssignUser();
    setSessionResolved(true);
  }, []);

  return !sessionResolved ? null : (
    <MuiThemeProvider theme={theme}>
      <UserContext.Provider value={userContextValue}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={
                authenticated
                  ? () => <Redirect to="/empty" />
                  : () => <Redirect to="/signup" />
              }
            />
            <AuthRoute
              authed={authenticated}
              path="/signup"
              component={Signup}
            />
            <AuthRoute authed={authenticated} path="/login" component={Login} />
            <PrivateRoute
              authed={authenticated}
              path="/empty"
              component={Empty}
            />
            <PrivateRoute authed={authenticated} component={Empty} />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </MuiThemeProvider>
  );
}

export default App;
