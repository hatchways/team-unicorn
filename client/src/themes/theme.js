import {createMuiTheme} from '@material-ui/core';

import Montserrat from 'typeface-montserrat';

const baseThemeSettings = {
  typography: {
    fontFamily: 'Montserrat, arial',
    fontSize: 14,
    h1: {
      fontFamily: 'Century Gothic',
      fontSize: 26,
      fontWeight: 'bold',
    },
    h2: {
      fontWeight: 'bold',
      fontSize: 24,
    },
    h3: {
      fontFamily: 'Century Gothic',
      fontSize: 26,
      fontWeight: 'bold',
    },
    h4: {
      fontFamily: 'Century Gothic',
      fontSize: 16,
      fontWeight: 'bold',
    },
    h5: {
      fontSize: 16,
      fontWeight: 500,
    },
    h6: {
      fontSize: 14,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 22,
      fontWeight: 'bold',
      lineHeight: 1.2,
    },
    subtitle2: {
      fontSIze: 16,
    },
    body1: {
      fontSize: 14,
      fontWeight: 500,
      wordBreak: 'break-all',
    },
    body2: {
      fontSize: 12,
    },
    button: {
      fontWeight: 500,
      fontSize: 14,
    },
  },
  palette: {
    primary: {
      main: '#759CFC',
      contrastText: '#ffffff',
    },
    secondary: {main: '#d32f2f', contrastText: '#ffffff'},
    divider: '#D8DFED',
    background: {paper: '#fff', default: '#F4F6FF'},
    props: {
      slideBackground: '#D8D8D8',
      slideFont: '#FFF',
      cardSubTitle: '#9BA9CC',
      textAreaBorder: '#D8DFE8',
      dialogClose: '#BCBCBC',
    },
  },
  pageIndent: 5,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [Montserrat],
      },
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
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

export {dialogTheme};
export default theme;
