import React from 'react';
import {Card, Typography} from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  drag: {
    width: 275,
    minHeight: '20vh',
    padding: theme.spacing(1),
    borderRadius: 4,
    backgroundColor: '#F4F6FF',
    border: "1px solid red"
  },
  card: {
    userSelect: "none",
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  "card-footer": {
    display: "flex",
    flexDirection: "column"
  }
}));

export default function Task(props) {
  const classes = useStyles();

  return(
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Card 
          className={classes.card}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
          style={{
            ...provided.draggableProps.style
          }}
        >
          <Typography gutterBottom>
            {props.task.content}
          </Typography>
          <div className={classes["card-footer"]}>
            <Typography style={{textAlign: 'right'}}variant="caption">
              id: {props.task.id}
            </Typography>
            {props.task.date ? <Typography style={{textAlign: 'right'}}variant="caption">
              deadline: {props.task.date}
            </Typography> : null}
          </div>

        </Card>

      )}
    </Draggable>
  )
}
