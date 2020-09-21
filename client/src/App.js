import React, {useState, useEffect} from 'react';
import {MuiThemeProvider} from '@material-ui/core';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
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
      if (apiResult.sucess) {
        setUser(apiResult.user);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };

    resolveAndAssignUser();
    setSessionResolved(true);
  }, []);

  const AuthRoutes = (
    <>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/signup" />} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </>
  );

  return !sessionResolved ? null : (
    <MuiThemeProvider theme={theme}>
      <UserContext.Provider value={userContextValue}>
        <BrowserRouter>
          {!authenticated ? (
            AuthRoutes
          ) : (
            <Switch>
              <Route path="/empty" component={Empty} />
              <Route component={Empty} />
            </Switch>
          )}
        </BrowserRouter>
      </UserContext.Provider>
    </MuiThemeProvider>
  );
}

export default App;
