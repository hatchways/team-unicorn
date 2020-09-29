import React, { useState, useEffect, memo } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import { CardActions, Grid } from '@material-ui/core';
import Column from './components/Column';

import {getBoard, saveBoard} from '../../api/Board';

import AddColumnSidebar from './components/dashboardUI/AddColumnSidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  column: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    margin: theme.spacing(1),
    minHeight: '30vh',
    backgroundColor: '#F4F6FF',
    borderRadius: 4,
  },
  drag: {
    width: 275, 
    minHeight: '20vh',
    padding: theme.spacing(1),
    borderRadius: 4,
    backgroundColor: '#F4F6FF',
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
  addColumnContainer: {
    width: '30vh',
    overflow: 'hidden',
    '&#leftNav': {
      '& .addColumnContent': {
        minHeight: '500px',
        '& a': {
          width: '2%',
          padding: '0 30px 0 0',
          left: '-30px',
          minHeight: '500px',
          position: 'fixed',
          textDecoration: 'none',
          height: 'inherit',
          display: 'flex',
          alignItems: 'center',
          '& button': {
            marginRight: '10px',
            backgroundColor: 'lightgrey',
            padding: '0px',
            color: 'grey',
          },
          '&:hover': {
            padding: '0 0 0 20px',
            left: 0,
            position: 'relative',
            width: 'fit-content',
            backgroundColor: 'lightgrey',
            transition: '0.05s',
          },
        },
      },
    },
    '&#rightNav': {
      display: 'flex',
      justifyContent: 'flex-end',
      '& .addColumnContent': {
        minHeight: '500px',
        '& a': {
          position: 'fixed',
          transition: '0.1s',
          textDecoration: 'none',
          height: 'inherit',
          display: 'flex',
          alignItems: 'center',
          width: '2%',
          padding: '0 0 0 30px',
          right: '-30px',
          minHeight: '500px',
          '& button': {
            marginLeft: '10px',
            backgroundColor: 'lightgrey',
            color: 'grey',
            padding: '0px',
          },
          '&:hover': {
            position: 'relative',
            width: 'fit-content',
            backgroundColor: 'lightgrey',
            right: 0,
            padding: '0 10px 0 0',
          },
        },
      },
    },
  },
}));

// performance optimization. prevents re-render when components are dragged all over w/memo
const InnerList = memo((props) => {
  const { column, taskMap, index, setUpdate = { setUpdate } } = props;
  const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
  return <Column column={column} tasks={tasks} index={index} setUpdate={setUpdate} />;
});

export default function KanbanBoard() {
  const [data, setData] = useState({
    id: '',
    tasks: {},
    columns: {},
    columnOrder: []
  });

  const [update, setUpdate] = useState(true)

  const convertAPIData = async () => {
    const boardData = await getBoard()
    
    const data = await boardData.data
    
    const newData = {
      id: data._id,
      tasks: {},
      columns: {},
      columnOrder: [],
    }
    await data.columns.map(column => {
      newData.columns[column._id] = {
        id: column._id,
        title: column.name,
        taskIds: column.cards.map(card => card._id)
      }
      column.cards.map(card => {
        newData.tasks[card._id] = {
          id: card._id,
          content: card.name
        }
      })
      newData.columnOrder.push(column._id)
    })
    setData(newData)
  }

  useEffect(() => {
    if (update) {
      convertAPIData()
      setUpdate(false)
    }
  }, [update])

  const classes = useStyles();
  const onDragEnd = async (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };

      await setData(newState);
      await saveBoard(data.id, {columns: newState.columnOrder});      
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      await setData(newState);
      await saveBoard(data.id, {columns: newState.columnOrder})
      return;
    }

    // between lists
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setData(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    {/* // Add Left and Right Hover Bars for adding columns */}
    <div className={classes.addColumnContainer} id="leftNav"> 
      {data.columns ? (
        <AddColumnSidebar 
          data={data}
          setData={setData}
          setLoadBoard={setUpdate}
          boardId={data.id}
        />
      ) : null}
    </div>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Grid
            className={classes.root}
            {...provided.droppableProps}
            innerRef={provided.innerRef}
          >
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              return (
                <InnerList
                  key={column.id}
                  column={column}
                  taskMap={data.tasks}
                  index={index}
                  setUpdate={setUpdate}
                />
              );
            })}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
      <div className={classes.addColumnContainer} id="rightNav"> 
      {data.columns ? (
        <AddColumnSidebar 
          data={data}
          setData={setData}
          setLoadBoard={setUpdate}
          boardId={data.id}
        />
      ) : null}
    </div>
    </DragDropContext>
  );
}
