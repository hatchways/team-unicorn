import React from 'react';
import {MuiThemeProvider} from '@material-ui/core';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

import {theme} from './themes/theme';

import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import './App.css';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={() => <Redirect to="/signup" />} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
