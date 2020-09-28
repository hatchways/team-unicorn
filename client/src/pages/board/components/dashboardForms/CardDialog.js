import React from 'react';
import {
  Dialog,
  DialogContent,
  Divider,
  Grid,
  makeStyles,
} from '@material-ui/core';
import CardDialogTitle from './CardDialogTitle';
import CardDialogDesc from './CardDialogDesc';
import CardDialogDeadline from './CardDialogDeadline';
import CardDialogComments from './CardDialogComments';

const useStyles = makeStyles((theme) => ({
  divider: {
    marginBottom: theme.spacing(2),
  },
}));

const CardDialog = ({
  title,
  columnName,
  desc,
  deadline,
  tags,
  color,
  comments,
  attachements,
  onClose,
  ...rest
}) => {
  const classes = useStyles();
  const subtitle = `In list "${columnName}"`;

  return (
    <Dialog fullWidth onClose={onClose} {...rest}>
      <CardDialogTitle onClose={onClose} color={color} subtitle={subtitle}>
        {title}
      </CardDialogTitle>
      <Divider className={classes.divider} variant="fullWidth" light />
      <DialogContent>
        <Grid container direction="column" justify="space-evenly" spacing={2}>
          <Grid item xs>
            <CardDialogDesc desc={desc} />
          </Grid>
          <Grid item xs>
            <CardDialogDeadline date={deadline} />
          </Grid>
          <Grid item xs>
            <CardDialogComments comments={comments} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CardDialog;
