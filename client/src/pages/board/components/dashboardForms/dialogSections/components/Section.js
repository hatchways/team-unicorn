import React from 'react';
import {Box, makeStyles, Typography, IconButton} from '@material-ui/core';
import LockedIcon from '@material-ui/icons/LockOutlined';
import UnlockedIcon from '@material-ui/icons/LockOpenOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlineRounded';
import WithIcon from './WithIcon';

const useStyles = makeStyles({
  labelText: {
    fontWeight: 'bold',
  },
});

const Section = ({
  code,
  title,
  IconComponent,
  optional = false,
  locked,
  handleToggleLock,
  handleDelete,
  children,
  ...rest
}) => {
  const classes = useStyles();

  const onLock = () => handleToggleLock();
  const onDelete = () => handleDelete(code);

  const LockIcon = locked ? LockedIcon : UnlockedIcon;

  return (
    <Box marginBottom={3} {...rest}>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        marginY={1}
      >
        <WithIcon Icon={IconComponent} iconColor="primary">
          <Typography className={classes.labelText} variant="h6">
            {title}
          </Typography>
        </WithIcon>
        <Box>
          <IconButton size="small" onClick={onLock}>
            <LockIcon />
          </IconButton>
          <IconButton
            size="small"
            disabled={!optional || locked}
            onClick={onDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default Section;
