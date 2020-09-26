/* eslint-disable no-unused-vars */
import React, {useState, useEffect, memo} from 'react';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Grid} from '@material-ui/core';
import mockData from './mock-data';
import Column from '../components/column';
import ColumnCopy from '../components/column-copy';
import getBoard from '../api/Board';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    overflow: 'auto',
    height: '80vh',
  },
}));

// performance optimization. prevents re-render when components are dragged all over w/memo
const InnerList = memo((props) => {
  const {column, taskMap, index} = props;
  const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
  return <Column column={column} tasks={tasks} index={index} />;
});

const InnerListCopy = memo((props) => {
  const {column, taskMap, index} = props;
  // const tasks = column.cards.map((task) => console.log(task._id));
  return <ColumnCopy column={column} tasks={taskMap} index={index} />;
});

export default function KanbanBoard() {
  const [data, setData] = useState(mockData);
  const [fetch, setFetch] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadBoard, setLoadBoard] = useState(true);

  const loadData = async () => {
    const payload = await getBoard();
    setFetch(payload.data);
    setLoading(payload.loading);
    setError(payload.error);
    setLoadBoard(false);
  };

  useEffect(() => {
    if (loadBoard) loadData();
  }, [loadBoard]);

  const classes = useStyles();
  // fetch test

  // dnd
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

      const newColumns = Array.from(fetch.columns);
      newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, draggableId);

      const newColumnsState = {
        ...fetch,
        columns: newColumns,
      };

      setFetch(newColumnsState);
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
            {/* <Button onClick={loadData}>Fetch</Button> */}
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
            {/* {fetch
              ? fetch.columns.map((column, index) => {
                  console.log({index});
                  console.log(column.cards);
                  {
                    return (
                      <InnerListCopy
                        key={column._id}
                        column={column}
                        taskMap={column.cards}
                        index={index}
                      />
                    );
                  }
                })
              : null} */}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  );
}
