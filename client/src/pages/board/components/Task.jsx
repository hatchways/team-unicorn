import React, {useState, useEffect} from 'react';
import {Card, Typography} from '@material-ui/core';
import {Draggable} from 'react-beautiful-dnd';
import {makeStyles} from '@material-ui/core/styles';
import {updateCard} from 'api/Card';
import CardDialog from './dashboardForms/CardDialog';
import Colorbar from './dashboardForms/dialogSections/Colorbar';
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
  'card-header': {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  }
}));

export default function Task({id, columnName, title, index}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [saveRequestData, setSaveRequestData] = useState(null);
  const [color, setColor] = useState() //temporary 

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const submitSaveRequest = async () => {
      const {details} = saveRequestData;
      const {success, errors} = await updateCard({id, title, details});
      // TODO: display snackbars
      if (success) {
        setColor(details.color)
        setSaveRequestData(null);
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
            key='colorbar'
          >
            <div className={classes['card-header']}><Colorbar color={color} /></div>
            <Typography gutterBottom> {title}</Typography>
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
        setColor={setColor}
      />
    </>
  );
}
