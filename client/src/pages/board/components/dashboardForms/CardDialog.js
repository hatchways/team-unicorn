import React, {useReducer} from 'react';
import {
  Dialog,
  DialogActions,
  Button,
  Divider,
  MuiThemeProvider,
} from '@material-ui/core';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CardDialogTitle from './dialogSections/CardDialogTitle';
import {dialogTheme} from '../../../../themes/theme';
import CardDialogContentBody from './CardDialogContentBody';

const detailsReducer = (details, updatedSection) => {
  console.log(details, updatedSection);
  return {...details, ...updatedSection};
};

const CardDialog = ({
  title: initTitle,
  columnName,
  details: initDetails,
  onClose,
  onSave,
  ...rest
}) => {
  const subtitle = `In list "${columnName}"`;

  const [cardFields, dispatchCardUpdate] = useReducer(detailsReducer, {
    title: initTitle,
    ...initDetails,
  });
  const {
    title,
    color,
    desc,
    checklist,
    deadline,
    comments,
    attachments,
    tags,
  } = cardFields;

  const saveAndExit = () => {
    onSave(cardFields);
    onClose();
  };

  const discardAndExit = () => {
    onClose();
  };
  return (
    <MuiThemeProvider theme={dialogTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Dialog fullWidth onClose={onClose} {...rest}>
          <CardDialogTitle
            onClose={onClose}
            cardColor={color}
            subtitle={subtitle}
            dispatchUpdate={dispatchCardUpdate}
          >
            {title}
          </CardDialogTitle>
          <Divider variant="fullWidth" light />
          <CardDialogContentBody
            desc={desc}
            deadline={deadline}
            checklist={checklist}
            comments={comments}
            attachments={attachments}
            tags={tags}
            dispatchUpdate={dispatchCardUpdate}
          />

          <DialogActions>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={saveAndExit}
            >
              Save
            </Button>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={discardAndExit}
            >
              Discard
            </Button>
          </DialogActions>
        </Dialog>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};

export default CardDialog;
