import {createMuiTheme} from '@material-ui/core';

import Montserrat from 'typeface-montserrat';

const baseThemeSettings = {
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
  },
};

const dialogTheme = createMuiTheme(
  {
    typography: {
      ...baseThemeSettings.typography,
      fontSize: 12,
    },
  },
  baseThemeSettings,
);

const theme = createMuiTheme(baseThemeSettings);

export {dialogTheme, theme};
export default theme;
