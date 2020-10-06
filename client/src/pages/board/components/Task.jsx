import React, {useState, useEffect} from 'react';
import {Card, Typography} from '@material-ui/core';
import {Draggable} from 'react-beautiful-dnd';
import {makeStyles} from '@material-ui/core/styles';
import {getCardById, updateCard} from 'api/Card';
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

export default function Task({id, columnName, title, index}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async ({title: updatedTitle, details: updatedDetails}) => {
    const {success, error} = await updateCard(id, updatedTitle, updatedDetails);
    if (success) {
      setDetails(updatedDetails);
    } else {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadDetails = async () => {
      const {success, data, error} = await getCardById(id);
      if (success) {
        const {details: fetched} = data;
        setDetails(fetched);
      } else {
        console.log(error);
      }
    };

    if (open) {
      loadDetails();
    }
    return () => {
      // TODO: Cancel request?
    };
  }, [id, open]);

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
      {details && (
        <CardDialog
          title={title}
          columnName={columnName}
          {...details}
          open={open}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </>
  );
}
