import React, { memo , useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Grid, Typography } from '@material-ui/core';

import Task from './Task'
import AddCardDialogForm from './dashboardForms/AddCardDialogForm';

const useStyles = makeStyles((theme) => ({
  column: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    margin: theme.spacing(1),
    backgroundColor: '#F4F6FF',
    borderRadius: 4,
    border: '1px solid grey',
    display: 'flex',
    flexDirection: 'column',
    width: '220px',
  },
  drag: {
    width: '220px',
    minHeight: '100px',
    borderRadius: 4,
    backgroundColor: '#F4F6FF',
    flexGrow: 1,
  },
  card: {
    userSelect: 'none',
    minHeight: '50px',
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  button: {
    color: 'black',
    backgroundColor: '#F4F6FF',
    '&:hover': {
      color: 'white',
      backgroundColor: '#759CFC',
    },
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    textTransform: 'none',
    alignContent: 'center',
  },
}));

// performance optimization. prevents re-render when components are dragged all over w/memo
const InnerList = memo(({ tasks }) =>
  tasks.map((task, index) => <Task key={task.id} task={task} index={index} />),
);

export default function Column({ column, index, tasks, setUpdate}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true)
  }
  return (
    <Draggable draggableId={column.id} index={index}>
      {(providedForDraggable) => (
        <Grid
          className={classes.column}
          {...providedForDraggable.draggableProps}
          innerRef={providedForDraggable.innerRef}
        >
          <Typography variant="h6" {...providedForDraggable.dragHandleProps}>
            {column.title}
          </Typography>
          <Droppable droppableId={column.id} type="task">
            {(providedForDroppable, snapshot) => (
              <Grid
                item
                className={classes.drag}
                innerRef={providedForDroppable.innerRef}
                {...providedForDroppable.droppableProps}
                style={{
                  backgroundColor: snapshot.isDraggingOver
                    ? '#E6ECFC'
                    : 'white',
                }}
              >
                <InnerList tasks={tasks} />
                {providedForDroppable.placeholder}
                <Button className={classes.button} size="large" onClick={handleClickOpen}>
                  <Typography>Add a card</Typography>
                </Button>
                {open && (
                  <AddCardDialogForm
                    open={open}
                    setOpen={setOpen}
                    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
                    columnId={column.id}
                    setUpdate={setUpdate}
                  />
                )}

              </Grid>
            )}
          </Droppable>
        </Grid>
      )}
    </Draggable>
  );
}
