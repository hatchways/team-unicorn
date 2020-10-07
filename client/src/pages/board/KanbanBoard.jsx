import React, {useContext, memo} from 'react';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Board from 'api/Board';
import {BoardContext} from 'contexts/boardContext';
import boardActions from 'contexts/boardActions';
import Column from './components/Column';
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
  dashboardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  addColumnContainer: {
    width: '5%',
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
            backgroundColor: theme.palette.props.slideFont,
            padding: '0px',
            color: theme.palette.props.slideBackground,
          },
          '&:hover': {
            padding: '0 0 0 20px',
            left: 0,
            position: 'relative',
            width: 'fit-content',
            backgroundColor: theme.palette.props.slideBackground,
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
            backgroundColor: theme.palette.props.slideFont,
            color: theme.palette.props.slideBackground,
            padding: '0px',
          },
          '&:hover': {
            position: 'relative',
            width: 'fit-content',
            backgroundColor: theme.palette.props.slideBackground,
            right: 0,
            padding: '0 10px 0 0',
          },
        },
      },
    },
  },
}));

// performance optimization. prevents re-render when components are dragged all over w/memo
const MemoizedColumn = memo((props) => {
  const {column, taskMap, index} = props;
  const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
  return <Column column={column} tasks={tasks} index={index} />;
});

const Columns = ({data}) => {
  const {columns, columnOrder, tasks} = data;
  return columnOrder.map((columnId, index) => {
    const column = columns[columnId];
    return (
      <MemoizedColumn
        key={column.id}
        column={column}
        taskMap={tasks}
        index={index}
      />
    );
  });
};

export default function KanbanBoard() {
  const {data, dispatch} = useContext(BoardContext);

  const classes = useStyles();

  const onDragEnd = async (result) => {
    const {destination, source, type} = result;

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
      boardActions.moveColumn(source.index, destination.index, dispatch);
      await Board.saveData(data.id, {columns: data.columnOrder});
      return;
    }

    // moving cards
    await boardActions.moveCard(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      dispatch,
    );
  };

  return (
    <div className={classes.dashboardContainer}>
      {/* Add Left and Right Hover Bars for adding columns */}
      <div className={classes.addColumnContainer} id="leftNav">
        {data.columns ? (
          <AddColumnSidebar data={data} boardId={data.id} />
        ) : null}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Grid
              className={classes.root}
              {...provided.droppableProps}
              innerRef={provided.innerRef}
            >
              <Columns data={data} />
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
      <div className={classes.addColumnContainer} id="rightNav">
        {data.columns ? (
          <AddColumnSidebar data={data} boardId={data.id} />
        ) : null}
      </div>
    </div>
  );
}
