import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Grid,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core';
import CardDialogTitle from './CardDialogTitle';
import CardDialogDesc from './CardDialogDesc';
import CardDialogDeadline from './CardDialogDeadline';
import CardDialogComments from './CardDialogComments';
import CardDialogButtons from './CardDialogButtons';
import {dialogTheme} from '../../../../themes/theme';

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
    <MuiThemeProvider theme={dialogTheme}>
      <Dialog onClose={onClose} {...rest}>
        <CardDialogTitle onClose={onClose} color={color} subtitle={subtitle}>
          {title}
        </CardDialogTitle>
        <Divider className={classes.divider} variant="fullWidth" light />
        <DialogContent>
          <Grid container alignItems="stretch" spacing={3}>
            <Grid
              container
              item
              direction="column"
              justify="space-evenly"
              spacing={2}
              xs
            >
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
            <Grid container item direction="column" xs={3}>
              <CardDialogButtons />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="small" color="primary">
            Save
          </Button>
          <Button variant="contained" size="small" color="primary">
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>
  );
};

export default CardDialog;
