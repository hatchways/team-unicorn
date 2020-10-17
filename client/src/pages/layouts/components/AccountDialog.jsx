import React, {useContext} from 'react';
import {Box, Grid, Button, Dialog, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../../../contexts';
import {BoardContext} from '../../../contexts/boardContext';
import Subscribe from '../../Subscribe';
 
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: "center",
  },
  box: {
    justifyContent: "center",
    backgroundColor: "#F4F6FF",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  limit: {
    color: 'red'
  }
}));

const AccountDialog = (props) => {
  
  const classes = useStyles();
  const {open, closeMenu} = props;
  const {user, setUser} = useContext(UserContext)
  const {data} = useContext(BoardContext)
  let columnCount = data.columnOrder.length

  const handleClose = () => {
    closeMenu();
  };

  return (
    <Dialog className={classes.root} open={open} onClose={closeMenu}>
      <Grid className={classes.box}>
        <DialogTitle>
          Account Details
        </DialogTitle>
        <DialogContent>
          <Grid item>
          <DialogContentText>
            Full Name: {user.name}
          </DialogContentText>
          <DialogContentText>
            Email: {user.email}
          </DialogContentText>
          <DialogContentText>
            Tier: {user.stripeCustomerId !== "free" ? "Premium" : "Free"}
          </DialogContentText>
          </Grid>
          <Grid item>
          <DialogContentText className={user.stripeCustomerId !== "free" ? null : classes.limit}>
            Board Count: {user.stripeCustomerId !== "free" ? "Unlimited" : 1}
          </DialogContentText>
          <DialogContentText className={(columnCount === 6 && user.stripeCustomerId === "free") ? classes.limit : null}>
            Column Count: {user.stripeCustomerId !== "free" ? "Unlimited" : columnCount}
          </DialogContentText>
          </Grid>
          <Subscribe user={user} setUser={setUser} />
        </DialogContent>
      </Grid>
      <Button color="primary" onClick={handleClose}>Close</Button>
    </Dialog>
  );
};

export default AccountDialog;
