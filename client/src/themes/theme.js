import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat, arial',
  },
  palette: {
    primary: {
      main: '#759CFC',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f44336',
      contrastText: '#ffffff',
    },
  },
  pageIndent: 5,
});

export default theme;
