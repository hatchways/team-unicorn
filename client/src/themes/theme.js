import {createMuiTheme} from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    },
    h6: {
      fontSize: 16,
    },
  },
  palette: {
    primary: {main: '#759CFC'},
    secondary: {main: '#fff'},
  },
});

export default theme;
