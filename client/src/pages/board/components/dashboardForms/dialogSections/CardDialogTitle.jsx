import React, {useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import TitleIcon from '@material-ui/icons/AssignmentOutlined';
import {
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
  Input,
} from '@material-ui/core';
import WithIcon from './components/WithIcon';
import Colorbar from './Colorbar';

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

const CardDialogTitle = ({
  children,
  onClose,
  subtitle,
  cardColor,
  saveTitle,
  dispatchUpdate,
}) => {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);

  const onColorChange = (value) => dispatchUpdate({color: value});
  const updateTitle = (e) => {
    const value = e.target.value ? e.target.value : 'Add title...';
    saveTitle(value);
    setEditing(false);
  };

  const title = children || 'Add title...';
  return (
    <DialogTitle disableTypography>
      <WithIcon spacing={2} Icon={TitleIcon} iconColor="primary">
        {editing ? (
          <Input autoFocus placeholder={title} onBlur={updateTitle} />
        ) : (
          <Typography
            variant="h5"
            className={classes.title}
            onDoubleClick={() => setEditing(true)}
          >
            {title}
          </Typography>
        )}
        <Colorbar color={cardColor} onColorChange={onColorChange} />
      </WithIcon>
      <WithIcon spacing={2} aligner>
        <Typography className={classes.subtitle} variant="subtitle2">
          {subtitle}
        </Typography>
      </WithIcon>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};

export default CardDialogTitle;
