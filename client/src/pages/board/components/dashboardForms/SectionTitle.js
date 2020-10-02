import React from 'react';
import {Typography, makeStyles, Box, IconButton} from '@material-ui/core';
import LockedIcon from '@material-ui/icons/LockOutlined';
import UnlockedIcon from '@material-ui/icons/LockOpenOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlineRounded';
import WithIcon from '../../../../components/WithIcon';

const useStyles = makeStyles({
  labelText: {
    fontWeight: 'bold',
  },
});

// NOTE: Do not use individually, at least for now.
//       This component is meant to be used within Section
//       component, by the Section component itself.
//       Might be changed later to facilitate modifying section titles.

const SectionTitle = ({
  handleDelete,
  deletable = false,
  variant,
  icon,
  children,
  locked,
  handleLock,
}) => {
  const classes = useStyles();

  const LockIcon = locked ? LockedIcon : UnlockedIcon;
  const onLockClick = () => handleLock(locked);
  return (
    <Box display="flex" justifyContent="space-between" width="100%" marginY={1}>
      <WithIcon Icon={icon} iconColor="primary">
        <Typography className={classes.labelText} variant={variant}>
          {children}
        </Typography>
      </WithIcon>
      <Box>
        <IconButton size="small" onClick={onLockClick}>
          <LockIcon />
        </IconButton>
        <IconButton size="small" disabled={!deletable} onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SectionTitle;
