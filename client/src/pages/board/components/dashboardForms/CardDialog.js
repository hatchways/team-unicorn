import React, {useReducer, useState, useCallback} from 'react';
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
import SectionInfos from './dialogSections/enums';

const detailsReducer = (details, updatedSection) => {
  return {...details, ...updatedSection};
};

const CardDialog = ({
  title,
  columnName,
  color: initColor,
  description: initDesc,
  checklist: initChecklist,
  deadline: initDeadline,
  comments: initComments,
  attachments: initAttachments,
  tags: initTags,
  onClose,
  onSave,
  ...rest
}) => {
  const subtitle = `In list "${columnName}"`;
  const [cardFields, dispatchCardUpdate] = useReducer(detailsReducer, {
    color: initColor,
    description: initDesc,
    checklist: initChecklist,
    deadline: initDeadline,
    comments: initComments,
    attachments: initAttachments,
    tags: initTags,
  });
  const {
    color,
    description,
    checklist,
    deadline,
    comments,
    attachments,
    tags,
  } = cardFields;
  const sectionValues = {
    DESC: description,
    CHCK: checklist,
    DEDL: deadline,
    COMM: comments,
    ATCH: attachments,
    TAGS: tags,
    // COVR: cover,
  };

  const [sections, setSections] = useState(
    Object.keys(SectionInfos).filter(
      (sectionCode) =>
        !SectionInfos[sectionCode].optional || sectionValues[sectionCode],
    ),
  );
  const [lockedSections, setLockedSections] = useState([]);

  const addSection = (sectionCode) => {
    if (!sections.includes(sectionCode)) {
      const updated = [...sections, sectionCode];
      setSections(updated);
    }
  };

  const deleteSection = (sectionCode) => {
    const updated = sections.filter((code) => code !== sectionCode);
    setSections(updated);
  };

  const toggleLock = useCallback(
    (sectionCode) =>
      setLockedSections((prevLocked) => {
        if (prevLocked.includes(sectionCode)) {
          return prevLocked.filter((lockedCode) => lockedCode !== sectionCode);
        }

        return [...prevLocked, sectionCode];
      }),
    [setLockedSections],
  );

  const saveAndExit = () => {
    // NOTE: Manually construct details outside of section (i.e only color for now)
    const initDetails = {color};
    const updatedDetails = sections.reduce((obj, sectionCode) => {
      const {dbPropName} = SectionInfos[sectionCode];
      return {...obj, [dbPropName]: cardFields[dbPropName]};
    }, initDetails);

    onSave({title, details: updatedDetails});
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
            lockedSections={lockedSections}
            toggleLock={toggleLock}
            sections={sections}
            sectionValues={sectionValues}
            addSection={addSection}
            deleteSection={deleteSection}
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
