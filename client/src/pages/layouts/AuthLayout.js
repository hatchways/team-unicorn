import {Grid, makeStyles, Box, Hidden} from '@material-ui/core';
import React, {useCallback, useState} from 'react';
import BaseSnackbar from 'components/snackbars/BaseSnackbar';
import AuthImg from '../static/authPageImage.png';
import CenteringBox from '../../components/CenteringBox';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  img: {
    height: '100%',
    maxWidth: '100%',
    objectFit: 'cover',
    verticalAlign: 'middle',
  },
  imgCol: {
    height: '100%',
  },
  footer: {
    height: '100px',
  },
});

// TODO:  Instead of hiding picture on small screens,
//        consider putting it in bg.
//        Also consider debouncing and moving components
//        dynamically (i.e. smoothly) upon resize.
const AuthLayout = ({
  formContainer: FormContainer,
  footer: FooterComponent,
}) => {
  const classes = useStyles();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const openSnackbar = useCallback((message, snackSeverity) => {
    setSnackMessage(message);
    setSnackOpen(true);
    setSeverity(snackSeverity);
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackOpen(false);
    setSnackMessage('');
  }, []);

  const formComponentWithFormProps = React.cloneElement(FormContainer, {
    formProps: {openSnackbar},
  });
  return (
    <Grid
      className={classes.root}
      direction="row"
      alignItems="stretch"
      container
    >
      <BaseSnackbar
        open={snackOpen}
        message={snackMessage}
        severity={severity}
        onClose={closeSnackbar}
      />

      <Hidden smDown>
        <Grid item md className={classes.imgCol}>
          <img className={classes.img} src={AuthImg} alt="KanBan Homepage" />
        </Grid>
      </Hidden>

      <Grid
        item
        component={Box}
        display="flex"
        flexDirection="column"
        className={classes.formCol}
        md
        xs={12}
      >
        <CenteringBox flexGrow={1}>{formComponentWithFormProps}</CenteringBox>
        <CenteringBox
          className={classes.footer}
          borderTop={1}
          borderColor="grey.300"
        >
          {FooterComponent}
        </CenteringBox>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
