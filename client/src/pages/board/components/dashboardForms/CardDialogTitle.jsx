import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import TitleIcon from '@material-ui/icons/AssignmentOutlined';
import {
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import WithIcon from '../../../../components/WithIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    fontWeight: 'light',
    color: theme.palette.grey[500],
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const CardDialogTitle = ({children, subtitle}) => {
  const classes = useStyles();
  return (
    <DialogTitle disableTypography>
      <WithIcon spacing={2} Icon={TitleIcon} iconColor="primary">
        <Typography variant="h5" className={classes.title}>
          {children}
        </Typography>
      </WithIcon>
      <WithIcon spacing={2} aligner>
        <Typography className={classes.subtitle} variant="subtitle2">
          {subtitle}
        </Typography>
      </WithIcon>
      <IconButton className={classes.closeButton}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};

export default CardDialogTitle;
