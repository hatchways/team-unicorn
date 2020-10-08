import {Box, makeStyles} from '@material-ui/core';
import React from 'react';
import DefaultIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) => ({
  icon: ({spacing, aligner}) => {
    return {
      marginRight: theme.spacing(spacing),
      visibility: aligner ? 'hidden' : 'visible',
    };
  },
}));

const WithIcon = ({
  spacing = 2,
  aligner = false,
  component = 'div',
  Icon = DefaultIcon,
  iconColor = 'inherit',
  children,
  ...other
}) => {
  const classes = useStyles({spacing, aligner});
  return (
    <Box display="flex" component={component} alignItems="center" {...other}>
      <Icon className={classes.icon} color={iconColor} />
      {children}
    </Box>
  );
};

export default WithIcon;
