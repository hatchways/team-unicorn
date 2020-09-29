import {Button, makeStyles} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
}));

const MenuButton = ({children, ...other}) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.root}
      size="small"
      variant="contained"
      color="primary"
      fullWidth
      {...other}
    >
      {children}
    </Button>
  );
};

export default MenuButton;
