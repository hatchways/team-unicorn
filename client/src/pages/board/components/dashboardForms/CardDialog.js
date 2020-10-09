import React, {useReducer, useState, useCallback, useEffect} from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  Button,
  Divider,
  MuiThemeProvider,
  CircularProgress,
  makeStyles,
  DialogContent,
} from '@material-ui/core';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {getCardById} from 'api/Card';
import CenteringBox from 'components/CenteringBox';
import CardDialogTitle from './dialogSections/CardDialogTitle';
import {dialogTheme} from '../../../../themes/theme';
import CardDialogContentBody from './CardDialogContentBody';
import SectionInfos from './dialogSections/enums';
import CardDialogButtonMenu from './dialogSections/CardDialogButtonMenu';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
});

const detailsReducer = (details, updatedSection) => {
  return {...details, ...updatedSection};
};

// TODO: Make title editable
// TODO: Make col editable
const CardDialog = ({
  id,
  title,
  columnName,
  tags: initTags,
  onClose,
  onSave,
  open,
  setColor,
  ...rest
}) => {
  const classes = useStyles();
  const subtitle = `In list "${columnName}"`;
  const [sections, setSections] = useState([]);
  const [lockedSections, setLockedSections] = useState([]);
  const [cardFields, dispatchCardUpdate] = useReducer(detailsReducer, {});
  const [loading, setLoading] = useState(false);

  // On mount, fetch detailed card data:
  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      const {success, data, errors} = await getCardById(id);
      if (success) {
        const {
          details: {
            meta: {sections: initSections, lockedSections: initLockedSections},
            ...details
          },
        } = data;
        
        setColor(cardFields.color)
        setSections(initSections.length === 0 ? ['DESC'] : initSections);
        setLockedSections(initLockedSections);
        dispatchCardUpdate(details);
      } else {
        // TODO: Snackbar
        console.log(errors);
      }
      setLoading(false);
    };
    if (open) {
      loadDetails();
    }
    return () => {
      // TODO: cancel request (axios cancel tokens)
    };
  }, [id, open]);

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
    const meta = {sections, lockedSections};
    const initDetails = {meta, color: cardFields.color};

    const updatedDetails = sections.reduce((obj, sectionCode) => {
      const {dbPropName} = SectionInfos[sectionCode];
      return {...obj, [dbPropName]: cardFields[dbPropName]};
    }, initDetails);

    onSave({details: updatedDetails});
    onClose();
  };
  const discardAndExit = () => {
    onClose();
  };

  // Destructuring/formatting details for rendering purposes:
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

  const ContentBody = loading ? (
    <CenteringBox alignSelf="stretch" flexGrow={1}>
      <CircularProgress />
    </CenteringBox>
  ) : (
    <CardDialogContentBody
      lockedSections={lockedSections}
      toggleLock={toggleLock}
      sections={sections}
      sectionValues={sectionValues}
      deleteSection={deleteSection}
      dispatchUpdate={dispatchCardUpdate}
    />
  );

  return (
    <MuiThemeProvider theme={dialogTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Dialog fullWidth open={open} onClose={saveAndExit} {...rest}>
          <CardDialogTitle
            onClose={discardAndExit}
            cardColor={color}
            subtitle={subtitle}
            dispatchUpdate={dispatchCardUpdate}
          >
            {title}
          </CardDialogTitle>
          <Divider variant="fullWidth" light />
          <DialogContent className={classes.content}>
            {ContentBody}
            <Box
              width="130px"
              minWidth="130px"
              maxWidth="130px"
              alignSelf="stretch"
              position="sticky"
              top={0}
              marginLeft={3}
            >
              <CardDialogButtonMenu handleAdd={addSection} />
            </Box>
          </DialogContent>

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
