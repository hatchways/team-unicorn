import React from 'react';
import {Card, Typography} from '@material-ui/core';
import {Draggable} from 'react-beautiful-dnd';
import {makeStyles} from '@material-ui/core/styles';

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

export default function Task({task, index}) {
  const classes = useStyles();
  
  const {id, content, date} = task;

  return (
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
        >
          <Typography gutterBottom>{content}</Typography>
          <div className={classes['card-footer']}>
            {date ? (
              <Typography style={{textAlign: 'right'}} variant="caption">
                deadline: {date}
              </Typography>
            ) : null}
          </div>
        </Card>
      )}
    </Draggable>
  );
}
