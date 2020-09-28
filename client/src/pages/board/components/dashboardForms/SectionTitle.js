import React from 'react';
import {Typography, makeStyles} from '@material-ui/core';
import TextWithIcon from '../../../../components/TextWithIcon';

const useStyles = makeStyles({
  labelText: {
    fontWeight: 'bold',
  },
});

const SectionTitle = ({variant, icon, children}) => {
  const classes = useStyles();

  return (
    <TextWithIcon Icon={icon} iconColor="primary">
      <Typography className={classes.labelText} variant={variant}>
        {children}
      </Typography>
    </TextWithIcon>
  );
};

export default SectionTitle;
