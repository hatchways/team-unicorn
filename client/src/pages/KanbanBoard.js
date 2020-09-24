import React, {useState, memo} from 'react';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import mockData from './mock-data';
import Column from '../components/Column';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'auto',
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
}));

// performance optimization. prevents re-render when components are dragged all over w/memo
const InnerList = memo((props) => {
  const {column, taskMap, index} = props;
  const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
  return <Column column={column} tasks={tasks} index={index} />;
});

export default function KanbanBoard() {
  const [data, setData] = useState(mockData);
  const classes = useStyles();
  const onDragEnd = (result) => {
    const {destination, source, draggableId, type} = result;

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

      setData(newState);
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
      setData(newState);
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
                />
              );
            })}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  );
}
