import React, {useState, useEffect} from 'react';
import {MuiThemeProvider} from '@material-ui/core';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import PrivateRoute from './components/PrivateRoute';
import UserContext from './contexts';
import {theme} from './themes/theme';
import Dashboard from './pages/Dashboard';

import Signup from './pages/Signup';
import Login from './pages/Login';
import './App.css';
import User from './api/User';

// TODO: Handle UI if server is unavailable?

function App() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [sessionResolved, setSessionResolved] = useState(false);

  const userContextValue = {user, setAuthenticated, setUser};
  useEffect(() => {
    const resolveAndAssignUser = async () => {
      const {success, data, errors} = await User.resolveSession();
      if (success) {
        const {user: resolvedUser} = data;
        setUser(resolvedUser);
        setAuthenticated(true);
      } else {
        // TODO: Do we want to display any messages
        //       regarding session resolution errors?
        console.log(errors);
        setAuthenticated(false);
      }
      setSessionResolved(true);
    };

    resolveAndAssignUser();
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
                  ? () => <Redirect to="/dashboard" />
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
              path="/dashboard"
              component={Dashboard}
            />
            <PrivateRoute
              authed={authenticated}
              path="/calendar"
              // TODO: Update component to calendar
              component={Dashboard}
            />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </MuiThemeProvider>
  );
}

export default App;
