import React from 'react';
import {Typography, makeStyles, Box, IconButton} from '@material-ui/core';
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

const SectionTitle = ({deletable = false, variant, icon, children}) => {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <WithIcon Icon={icon} iconColor="primary">
        <Typography className={classes.labelText} variant={variant}>
          {children}
        </Typography>
      </WithIcon>
      <IconButton disabled={!deletable}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default SectionTitle;
