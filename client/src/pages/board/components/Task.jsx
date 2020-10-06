import React, {useState, useEffect} from 'react';
import {Card, Typography} from '@material-ui/core';
import {Draggable} from 'react-beautiful-dnd';
import {makeStyles} from '@material-ui/core/styles';
import {getCardById} from 'api/Card';
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
  },
  'card-footer': {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default function Task({id, columnName, content, index}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);

  console.log(open);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const loadDetails = async () => {
      const {success, data, error} = await getCardById(id);
      if (success) {
        const {details: fetched} = data;
        console.log(fetched);
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
            <Typography gutterBottom>{content}</Typography>
            <div className={classes['card-footer']}>
              {/* {date ? (
                <Typography style={{textAlign: 'right'}} variant="caption">
                  deadline: {date}
                </Typography>
              ) : null} */}
            </div>
          </Card>
        )}
      </Draggable>
      <CardDialog
        title={content}
        columnName={columnName}
        details={details}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
