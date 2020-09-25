import {createMuiTheme} from '@material-ui/core';

import Montserrat from 'typeface-montserrat';

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
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [Montserrat],
      },
    },
    MuiButton: {
      root: {
        textTransform: 'capitalize',
      },
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

export default theme;
