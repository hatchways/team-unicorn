import {makeStyles} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '2rem',
    width: '30px',
    marginLeft: theme.spacing(2),
    borderWidth: '4px',
    borderColor: ({color}) => color,
    borderStyle: 'solid',
  },
}));

const Colorbar = ({color, ...htmlProps}) => {
  const classes = useStyles({color});
  return <span className={classes.root} {...htmlProps} />;
};

export default Colorbar;
