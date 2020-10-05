import React, {useState, useEffect} from 'react';
import {MuiThemeProvider} from '@material-ui/core';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import AuthRoute from './components/AuthRoute';
import PrivateRoute from './components/PrivateRoute';
import UserContext from './contexts';
import theme from './themes/theme';
import Dashboard from './pages/Dashboard';

import Signup from './pages/Signup';
import Login from './pages/Login';
import './App.css';
import User from './api/User';

// TODO: Handle UI if server is unavailable?

// STRIPE
import Subscription from './pages/Subscribe';

const stripeKey = loadStripe(
  'pk_test_51HWkpzD9AsNutHPoPsv3n7bvS04Gs98poP4UDgeFqq68GVEgRt1mJdfILPFgBZePOyICCSeHfXrYPQGIgQa9Zqme000nXXLlWg',
);

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
      <Elements stripe={stripeKey}>
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
              <AuthRoute
                authed={authenticated}
                path="/login"
                component={Login}
              />
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
              <PrivateRoute
                authed={authenticated}
                path="/subscription"
                // TODO: Update component to calendar
                component={() => <Subscription user={user} />}
              />
            </Switch>
          </BrowserRouter>
        </UserContext.Provider>
      </Elements>
    </MuiThemeProvider>
  );
}

export default App;
