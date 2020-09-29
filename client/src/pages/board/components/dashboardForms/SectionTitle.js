import React from 'react';
import {Typography, makeStyles} from '@material-ui/core';
import WithIcon from '../../../../components/WithIcon';

const useStyles = makeStyles({
  labelText: {
    fontWeight: 'bold',
  },
});

const SectionTitle = ({variant, icon, children}) => {
  const classes = useStyles();

  return (
    <WithIcon Icon={icon} iconColor="primary">
      <Typography className={classes.labelText} variant={variant}>
        {children}
      </Typography>
    </WithIcon>
  );
};

export default SectionTitle;
