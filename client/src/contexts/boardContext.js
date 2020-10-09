import React, {createContext, useEffect, useReducer, useState} from 'react';
import Board from 'api/Board';
import reducers from './boardReducers';

const initialState = {
  id: null,
  columns: {},
  columnOrder: [],
  tasks: {},
};

const BoardContext = createContext(initialState);

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
    case 'DELETE_COL':
      return reducers.deleteCol(state, action.colId);
    case 'INIT_BOARD':
      return reducers.initBoard(action.boardData);
    default:
      return state;
  }
};

const BoardProvider = ({children}) => {
  const [data, dispatch] = useReducer(boardReducer, initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const board = await Board.getData(0);
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
