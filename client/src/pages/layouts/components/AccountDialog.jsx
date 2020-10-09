import React, {useContext} from 'react';
import {Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../../../contexts';
import Subscribe from '../../Subscribe';
 
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: "center",
    alignContent: "center",
  },
  box: {
    flexGrow: 1,
    backgroundColor: "#F4F6FF",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const AccountDialog = (props) => {
  
  const classes = useStyles();
  const {open, closeMenu, setOpenSnackbar} = props;
  const {user, setUser} = useContext(UserContext)
  console.log({user})

  const handleClose = () => {
    closeMenu();
  };

  return (
    <Dialog className={classes.root} open={open} onClose={closeMenu}>
      <Box className={classes.box}>
        <DialogTitle>
          Account Details
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Full Name: {user.name}
          </DialogContentText>
          <DialogContentText>
            Email: {user.email}
          </DialogContentText>
          <DialogContentText>
            Tier: {user.stripeCustomerId !== "free" ? "Premium" : "Free"}
          </DialogContentText>
          <Subscribe user={user} />
        </DialogContent>
      </Box>
      <Button color="primary" onClick={handleClose}>Close</Button>
    </Dialog>
  );
};

export default AccountDialog;
