import {Box, makeStyles} from '@material-ui/core';
import React from 'react';
import DefaultIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) => ({
  icon: ({spacing, isAligner}) => {
    return {
      marginRight: theme.spacing(spacing),
      visibility: isAligner ? 'hidden' : 'visible',
    };
  },
}));

const TextWithIcon = ({
  spacing = 2,
  isAligner = false,
  Icon = DefaultIcon,
  iconColor = 'inherit',
  children,
  ...other
}) => {
  const classes = useStyles({spacing, isAligner});
  return (
    <Box display="flex" flexShrink={1} alignItems="center" {...other}>
      <Icon className={classes.icon} color={iconColor} />
      {children}
    </Box>
  );
};

export default TextWithIcon;
