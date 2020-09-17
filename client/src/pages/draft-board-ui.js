import React, { useState } from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Card, Button, Grid, Typography} from '@material-ui/core';
import uuid from 'uuid/v4';
import { theme } from '../themes/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%'
  },
  grid: {
    width: 275,
    minHeight: '20vh',
    padding: theme.spacing(1),
    borderRadius: 4,
    backgroundColor: '#F4F6FF',
  },
  column: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    margin: theme.spacing(1),
    minHeight: '30vh',
    backgroundColor: '#F4F6FF',
    borderRadius: 4,

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

const mockTasks = {
  issues: [{ id: uuid(), desc: "Refactor css", deadline: '09/17/2020'}, { id: uuid(), desc: "Add context and state management", deadline: '09/19/2020' },
],
  frontend: [{ id: uuid(), desc: "Drag columns", deadline: '09/17/2020' }, { id: uuid(), desc: "Drag cards", deadline: '09/17/2020' },
],
  progress: [{ id: uuid(), desc: "Create mock kanban board layout", deadline: '09/16/2020' }, { id: uuid(), desc: "Style board to match mock in google drive", deadline: '09/17/2020' }],
  review: [{ id: uuid(), desc: "Drag cards", deadline: '09/17/2020' },
],
  completed: [{ id: uuid(), desc: "Research and choose react drag-and-drop library", deadline: '09/15/2020' },
  { id: uuid(), desc: "Mock up data", deadline: '09/17/2020' },]
    
}

const mockColumns = {
  [uuid()]: {
    name: "New Issues",
    items: mockTasks.issues
  },
  [uuid()]: {
    name: "Frontend",
    items: mockTasks.frontend
  },
  [uuid()]: {
    name: "In Progress",
    items: mockTasks.progress
  },
  [uuid()]: {
    name: "In Review",
    items: mockTasks.review
  },
  [uuid()]: {
    name: "Completed",
    items: mockTasks.completed
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState(mockColumns)
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <Grid
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <Grid className={classes.column}>
              <Typography variant="h4" align="center" gutterBottom>{column.name}</Typography>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <Grid
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#E6ECFC"
                            : "#F4F6FF",

                        }}
                        className={classes.grid}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <Card
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? theme.palette.text.secondary
                                        : "#FFFFFF",
                                      ...provided.draggableProps.style
                                    }}
                                    className={classes.card}
                                  >
                                  <Typography gutterBottom>
                                    {item.desc}
                                  </Typography>
                                  <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                  }}>
                                    <Typography style={{textAlign: 'right'}}variant="caption">
                                      id: {item.id.substring(0,5)}
                                    </Typography>
                                    <Typography style={{textAlign: 'right'}}variant="caption">
                                      deadline: {item.deadline}
                                    </Typography>
                                  </div>
                                  </Card>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                        <Button className={classes.button} size="large">
                          <Typography>Add a card</Typography>
                        </Button>
                      </Grid>
                    );
                  }}
                </Droppable>
              </Grid>
            </Grid>
          );
        })}
      </DragDropContext>
    </div>
  );

}