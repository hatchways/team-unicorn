import React, {createContext, useEffect, useReducer, useState} from 'react';
import Board from '../api/Board';

const initialState = {
  id: null,
  columns: {},
  columnOrder: [],
  tasks: {},
};
const BoardContext = createContext(initialState);

const reducers = {
  addCard: (state, task, colId) => {
    const newTaskIds = Array.from(state.columns[colId].taskIds);
    newTaskIds.push(task.id);
    const newColumn = {
      ...state.columns[colId],
      taskIds: newTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      },
    };

    newState.tasks[task.id] = {id: task.id, content: task.name};

    return newState;
  },
  moveCard: (state, prevColId, nextColId, oldIndex, newIndex) => {
    const taskId = state.columns[prevColId].taskIds[oldIndex];
    if (prevColId === nextColId) {
      const newTaskIds = Array.from(state.columns[prevColId].taskIds);
      newTaskIds.splice(oldIndex, 1);
      newTaskIds.splice(newIndex, 0, taskId);

      const newColumn = {
        ...state.columns[prevColId],
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      return newState;
    }
    const prevTaskIds = Array.from(state.columns[prevColId].taskIds);
    prevTaskIds.splice(oldIndex, 1);

    const prevColumn = {
      ...state.columns[prevColId],
      taskIds: prevTaskIds,
    };

    const nextTaskIds = Array.from(state.columns[nextColId].taskIds);
    nextTaskIds.splice(newIndex, 0, taskId);
    const nextColumn = {
      ...state.columns[nextColId],
      taskIds: nextTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [prevColumn.id]: prevColumn,
        [nextColumn.id]: nextColumn,
      },
    };
    return newState;
  },
  addCol: (state, col) => {
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [col.id]: {id: col.id, title: col.name, taskIds: []},
      },
      columnOrder: state.columnOrder.concat(col.id),
    };
    return newState;
  },
  moveCol: (state, fromIndex, toIndex) => {
    const newState = {...state};
    const col = newState.columnOrder[fromIndex];
    newState.columnOrder.splice(fromIndex, 1);
    newState.columnOrder.splice(toIndex, 0, col);
    return newState;
  },
  initBoard: (boardData) => {
    return boardData;
  },
};

const boardReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return reducers.addCard(state, action.task, action.columnId);
    case 'MOVE_CARD':
      return reducers.moveCard(
        state,
        action.prevCol,
        action.nextCol,
        action.fromIndex,
        action.toIndex,
      );
    case 'ADD_COL':
      return reducers.addCol(state, action.col);
    case 'MOVE_COL':
      return reducers.moveCol(state, action.fromIndex, action.toIndex);
    case 'INIT_BOARD':
      return reducers.initBoard(action.boardData);
    default:
      return state;
  }
};

const BoardProvider = ({children}) => {
  // const [data, setBoardState] = useState(initialState)
  const [data, dispatch] = useReducer(boardReducer, initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const board = await Board.getData();
        dispatch({
          type: 'INIT_BOARD',
          boardData: board.data,
        });
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    };
    fetchData();
  }, []);

  // const [state, setState] = useState(initialState)
  return (
    <BoardContext.Provider
      value={{
        data,
        dispatch,
        loading,
        error,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export {BoardContext, BoardProvider};
