import React, {createContext, useEffect, useReducer, useState} from 'react';
import Board from 'api/Board';
import {convertBoardAPI} from 'api/Utils';
import reducers from './boardReducers';
import boardActions from './boardActions';

// const initialState = {
//   id: null,
//   columns: {},
//   columnOrder: [],
//   tasks: {},
//   index: 0,
// };

// const initialState = {
//   index: 0,
//   boards: [],
//   board: {},
//   convertedBoard: {},
//   convertedCalendar: {},
//   loading: true,
//   error: false,
//   view: 'dashboard',
//   data: {},
// }

const initialState = {
  boards: [],
  view: 'dashboard',
  boardView: {
    columns: {},
    columnOrder: [],
    tasks: {},
    id: null,
  },
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
      return reducers.initBoard(action.boards, action.board);
    case 'SWITCH_BOARD':
      return reducers.switchBoard(state, action.board);
    case 'SWITCH_VIEW':
      return reducers.switchView(state);
    // case 'ADD_BOARD':
    //   return reducers.addBoard(...);

    // case 'ADD_CARD_TO_CAL':
    //   return reducers.addCardToCal();
    // case 'UPDATE_DEADLINE':
    //   return reducers.updateDeadline();
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
        const boards = await Board.getAllBoards();
        const firstBoard = await Board.getBoard(boards.data[0].id);
        await boardActions.initBoard(
          boards,
          await convertBoardAPI(firstBoard.data),
          dispatch,
        );
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
