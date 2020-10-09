import React, {memo, useState, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import {
  Button,
  Box,
  Grid,
  IconButton,
  Input,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import {updateColumn, removeColumn} from 'api/Column';
import BaseSnackbar from 'components/snackbars/BaseSnackbar';
import Task from './Task';
import AddCardDialogForm from './dashboardForms/AddCardDialogForm';
import boardActions from '../../../contexts/boardActions';
import {BoardContext} from '../../../contexts/boardContext';

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
  input: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

// performance optimization. prevents re-render when components are dragged all over w/memo
const Tasks = memo(({tasks, columnName}) => {
  return tasks.map(({id, content: title}, index) => (
    <Task
      key={id}
      id={id}
      title={title}
      columnName={columnName}
      index={index}
    />
  ));
});

export default function Column({column, index, tasks, setUpdate}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [isEditing, setEditing] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {dispatch} = useContext(BoardContext);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const editTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const finishEdit = () => {
    setEditing(false);
    if (column.title !== title) {
      setOpenSnackbar(true);
    }
    updateColumn(column.id, {name: title});
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      finishEdit();
    }
  };

  const deleteCol = () => {
    boardActions.deleteColumn(column.id, dispatch);
    removeColumn(column.id);
  };

  return (
    <>
      <Draggable draggableId={column.id} index={index}>
        {(providedForDraggable) => (
          <Grid
            className={classes.column}
            {...providedForDraggable.draggableProps}
            innerRef={providedForDraggable.innerRef}
          >
            <Box />
            <Grid container alignItems="center">
              <Grid item xs={8}>
                {isEditing ? (
                  <Input
                    placeholder={title}
                    onBlur={finishEdit}
                    onChange={(e) => editTitle(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    fullWidth="false"
                  />
                ) : (
                  <Typography
                    variant="h6"
                    {...providedForDraggable.dragHandleProps}
                    noWrap
                    onDoubleClick={() => setEditing(true)}
                    className={classes.input}
                  >
                    {title}
                  </Typography>
                )}
              </Grid>
              <Grid item xs />
              <Grid item xs={3}>
                <IconButton edge="end" aria-label="delete" onClick={deleteCol}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>

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
                  <Tasks tasks={tasks} columnName={column.title} />
                  {providedForDroppable.placeholder}
                  <Button
                    className={classes.button}
                    size="large"
                    onClick={handleClickOpen}
                  >
                    <Typography>Add a card</Typography>
                  </Button>
                  {open && (
                    <AddCardDialogForm
                      open={open}
                      setOpen={setOpen}
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
      <BaseSnackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message="Column Title Changed!"
        severity="success"
      />
    </>
  );
}
