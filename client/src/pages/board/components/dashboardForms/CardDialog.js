import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  makeStyles,
  MuiThemeProvider,
  Box,
} from '@material-ui/core';
import CardDialogTitle from './CardDialogTitle';
import CardDialogDesc from './CardDialogDesc';
import CardDialogDeadline from './CardDialogDeadline';
import CardDialogComments from './CardDialogComments';
import CardDialogButtonMenu from './CardDialogButtonMenu';
import {dialogTheme} from '../../../../themes/theme';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(3),
  },
}));

// TODO: Make Typography/TextField component
//       (i.e Typography turns into text field
//             onClick/onFocus and turns into
//             onBlur typography)
//       Useful for comments and description.

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
        <Divider
          className={classes.horizontalDivider}
          variant="fullWidth"
          light
        />
        <DialogContent className={classes.dialogContent}>
          <Box
            display="flex"
            flexGrow={3}
            flexDirection="column"
            justifyContent="space-evenly"
          >
            <CardDialogDesc desc={desc} />
            <CardDialogDeadline date={deadline} />
            <CardDialogComments comments={comments} />
          </Box>
          <Box
            flexGrow={1}
            alignSelf="stretch"
            position="sticky"
            top={0}
            marginLeft={3}
          >
            <CardDialogButtonMenu />
          </Box>
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
