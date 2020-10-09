import {
  INIT,
  SET_LOADING,
  CHANGE_BOARD,
  ADD_BOARD,
  SET_ERROR,
  CHANGE_VIEW,
  ADDCARD_CALENDAR,
  UPDATECARD_CALENDAR,
} from '../types';
import {convertBoardAPI, convertCalendarAPI} from '../../api/Utils';

// Load View Data
const LoadViewData = (board) => {
  const convertedCalendar = convertCalendarAPI(board);
  const convertedBoard = convertBoardAPI(board);

  return {convertedCalendar, convertedBoard};
};

const reducers = {
  updateCardCalendar: (state, card) => {
    const columnId = card.column;
    const newState = state;
    const newBoards = newState.boards;
    const newBoard = newState.board;
    const newColumns = newBoard.columns.map((column) =>
      column.id === columnId
        ? {
            cards: column.cards.map((cardObject) =>
              cardObject.id === card.id ? card : cardObject,
            ),
            name: column.name,
            _id: column.id,
            id: column.id,
          }
        : column,
    );

    newState.board = {...newBoard, columns: newColumns};
    newState.boards = newBoards.map((board) =>
      board.id === newBoard.id ? newState.board : board,
    );

    return newState;
  },
  addCardCalendar: (state, card) => {
    const columnId = state.convertedCalendar.inProgessId;

    const newState = state;
    const newBoard = newState.board;
    const cardsArray = state.board.columns.filter(
      (column) => column.id === columnId,
    )[0].cards;

    cardsArray.push(card);
    newState.board = {
      ...newBoard,
      columns: newState.board.columns.map((column) =>
        column.id === columnId
          ? {
              cards: cardsArray,
              name: column.name,
              _id: column.id,
              id: column.id,
            }
          : column,
      ),
    };
    newState.boards = newState.boards.map((board) =>
      board.id === newBoard.id ? newState.board : board,
    );

    return newState;
  },
  changeBoard: (state, boardId) => {
    const newState = state;
    const newBoard = newState.boards.filter((board) => board.id === boardId)[0];
    const {convertedCalendar, convertedBoard} = LoadViewData(newBoard);

    return {
      ...newState,
      board: newBoard,
      view: 'dashboard',
      convertedBoard,
      convertedCalendar,
    };
  },
  changeView: (state, view) => {
    const {convertedCalendar, convertedBoard} = LoadViewData(state.board);
    return {...state, view, convertedCalendar, convertedBoard};
  },
  addBoard: (state, board) => {
    const {convertedCalendar, convertedBoard} = LoadViewData(board);
    return {
      ...state,
      boards: [...state.boards, board],
      board,
      convertedCalendar,
      convertedBoard,
      loading: false,
    };
  },
  init: (state, boards) => {
    const newBoard = boards[0];
    const convertedBoard = convertBoardAPI(newBoard);
    const convertedCalendar = convertCalendarAPI(newBoard);
    // eslint-disable-next-line no-console
    console.log('server', {boards, convertedBoard, convertedCalendar});
    return {
      ...state,
      boards,
      board: newBoard,
      convertedBoard,
      convertedCalendar,
      loading: false,
    };
  },
};
const BoardReducer = (state, action) => {
  const data = action.payload;
  switch (action.type) {
    case UPDATECARD_CALENDAR:
      return reducers.updateCardCalendar(state, data);
    case ADDCARD_CALENDAR:
      return reducers.addCardCalendar(state, data);
    case CHANGE_VIEW:
      return reducers.changeView(state, data);
    case CHANGE_BOARD:
      return reducers.changeBoard(state, data);
    case ADD_BOARD:
      return reducers.addBoard(state, data);
    case INIT:
      return reducers.init(state, data);
    case SET_ERROR:
      return {...state, loading: false, error: true};
    case SET_LOADING:
      return {...state, loading: true, error: false};
    default:
      return state;
  }
};

export default BoardReducer;
