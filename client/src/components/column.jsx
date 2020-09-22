import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import {Button, Grid, Typography} from '@material-ui/core';
import Task from '../components/task'

const useStyles = makeStyles((theme) => ({
  column: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    margin: theme.spacing(1),
    backgroundColor: '#F4F6FF',
    borderRadius: 4,
    border: "1px solid grey",
    display: "flex",
    flexDirection: "column",
    width: '220px'
    
  },
  drag: {
    width: '220px',
    minHeight: '100px',
    borderRadius: 4,
    backgroundColor: '#F4F6FF',
    flexGrow: 1,
  },
  card: {
    userSelect: "none",
    minHeight: "50px",
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  button: {
    color: "black",
    backgroundColor: "#F4F6FF",
    '&:hover': {
      color: 'white',
      backgroundColor: "#759CFC",
    },
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    textTransform: "none",
    alignContent: "center"
  },
}));

// performance optimization. prevents re-render when components are dragged all over w/memo
const InnerList = memo((props) => 
props.tasks.map((task, index) => <Task key={task.id} task={task} index ={index}></Task>)
);

export default function Column(props) {

  const classes = useStyles();

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => 
        <Grid 
          className={classes.column}
          {...provided.draggableProps}
          innerRef={provided.innerRef}
        >
          <Typography 
            variant="h6"
            {...provided.dragHandleProps}
          >
            {props.column.title}
          </Typography>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => 
              <Grid
                item 
                className={classes.drag}
                innerRef={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  backgroundColor: snapshot.isDraggingOver ? '#E6ECFC' : 'white'
                }}
              >
                <InnerList tasks={props.tasks}></InnerList>
                {provided.placeholder}
                <Button className={classes.button} size="large">
                  <Typography>Add a card</Typography>
                </Button>
              </Grid>
            }
          </Droppable>
        </Grid>
      }
    </Draggable>
  );
}