import React, {useState} from 'react';
import {Box, makeStyles, Typography, IconButton} from '@material-ui/core';
import LockedIcon from '@material-ui/icons/LockOutlined';
import UnlockedIcon from '@material-ui/icons/LockOpenOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlineRounded';
import WithIcon from '../../../../components/WithIcon';

const useStyles = makeStyles({
  labelText: {
    fontWeight: 'bold',
  },
});

const Section = React.forwardRef(
  (
    {
      name,
      title,
      titleIcon,
      optional = false,
      lockPropName = 'locked',
      handleDelete,
      children,
      ...rest
    },
    ref,
  ) => {
    console.log('Rendered,', name);
    const classes = useStyles();
    const [locked, setLocked] = useState(false);

    const onLock = () => setLocked(!locked);
    const onDelete = () => handleDelete(name);

    const LockIcon = locked ? LockedIcon : UnlockedIcon;

    return (
      <Box marginBottom={3} ref={ref} {...rest}>
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          marginY={1}
        >
          <WithIcon Icon={titleIcon} iconColor="primary">
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
        {React.cloneElement(children, {[lockPropName]: locked})}
      </Box>
    );
  },
);

export default Section;
