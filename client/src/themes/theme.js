import {createMuiTheme} from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat, arial',
    // fontSize: 14,
    // h1: {
    //   fontSize: 26,
    //   fontWeight: 'bold',
    // },
    // h2: {
    //   fontWeight: 'bold',
    //   fontSize: 24,
    // },
    // h4: {
    //   fontSize: 20,
    //   fontWeight: 600,
    // },
    // h5: {
    //   fontSize: 16,
    //   fontWeight: 500,
    // },
    // h6: {
    //   fontSize: 14,
    //   fontWeight: 500,
    // },
    // body1: {
    //   fontSize: 14,
    //   fontWeight: 500,
    // },
    // button: {
    //   fontWeight: 500,
    //   fontSize: 14,
    // },
  },
  palette: {
    primary: {main: '#759CFC'},
    secondary: {main: '#fff'},
  },
  // overrides: {
  //   MuiCssBaseline: {
  //     '@global': {
  //       '@font-face': [Montserrat],
  //     },
  //   },
  // },
  pageIndent: 5,
});
export default theme;
