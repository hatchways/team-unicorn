import React from 'react';
import {
  Dialog,
  DialogActions,
  Button,
  Divider,
  MuiThemeProvider,
} from '@material-ui/core';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CardDialogTitle from './CardDialogTitle';
import {dialogTheme} from '../../../../themes/theme';
import CardDialogContentBody from './CardDialogContentBody';

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
  attachments,
  onClose,
  ...rest
}) => {
  const subtitle = `In list "${columnName}"`;

  return (
    <MuiThemeProvider theme={dialogTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Dialog onClose={onClose} {...rest}>
          <CardDialogTitle
            onClose={onClose}
            cardColor={color}
            subtitle={subtitle}
          >
            {title}
          </CardDialogTitle>
          <Divider variant="fullWidth" light />
          <CardDialogContentBody
            desc={desc}
            deadline={deadline}
            comments={comments}
            attachments={attachments}
            tags={tags}
          />

          <DialogActions>
            <Button variant="contained" size="small" color="primary">
              Save
            </Button>
            <Button variant="contained" size="small" color="primary">
              Discard
            </Button>
          </DialogActions>
        </Dialog>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};

export default CardDialog;
