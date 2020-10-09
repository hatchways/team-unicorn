import React, {useState, useEffect} from 'react';
import {Card, Typography} from '@material-ui/core';
import {Draggable} from 'react-beautiful-dnd';
import {makeStyles} from '@material-ui/core/styles';
import {updateCard} from 'api/Card';
import BaseSnackbar from 'components/snackbars/BaseSnackbar';
import CardDialog from './dashboardForms/CardDialog';

const useStyles = makeStyles((theme) => ({
  drag: {
    width: 275,
    minHeight: '20vh',
    padding: theme.spacing(1),
    borderRadius: 4,
    backgroundColor: '#F4F6FF',
    border: '1px solid red',
  },
  card: {
    userSelect: 'none',
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    '&:hover': {
      cursor: 'pointer',
    },
  },
  'card-footer': {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default function Task({id, columnName, title: initTitle, index}) {
  const classes = useStyles();
  const [title, setTitle] = useState(initTitle);
  const [open, setOpen] = useState(false);
  const [saveRequestData, setSaveRequestData] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const saveTitle = (value) => setTitle(value);

  useEffect(() => {
    const submitSaveRequest = async () => {
      const {details} = saveRequestData;
      const {success, errors} = await updateCard({id, title, details});
      // TODO: display snackbars
      if (success) {
        setSaveRequestData(null);
        setOpenSnackbar(true);
      } else {
        // TODO: Retry?
        console.error(errors);
      }
    };

    if (saveRequestData) {
      submitSaveRequest();
    }
    // TODO: Cleanup request.
  }, [id, title, saveRequestData]);

  const handleSave = (detailedCardData) => setSaveRequestData(detailedCardData);
  // TODO: Move dialog component outside of tasks, potentially to app ?
  return (
    <>
      <Draggable draggableId={id} index={index}>
        {({draggableProps, dragHandleProps, innerRef}) => (
          <Card
            className={classes.card}
            {...draggableProps}
            {...dragHandleProps}
            innerRef={innerRef}
            style={{
              ...draggableProps.style,
            }}
            onClick={handleOpen}
          >
            <Typography gutterBottom>{title}</Typography>
            <div className={classes['card-footer']} />
          </Card>
        )}
      </Draggable>
      <CardDialog
        title={title}
        id={id}
        columnName={columnName}
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        saveTitle={saveTitle}
      />
      <BaseSnackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message="Task Details Saved!"
        severity="success"
      />
    </>
  );
}
