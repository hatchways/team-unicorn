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

const reducers = {
  updateCardCalendar: (state, data) => {
    const columnId = data.column;
    const cardsArray = state.board.columns.filter(
      (column) => column.id === columnId,
    )[0].cards;
    const cardState = cardsArray.filter(
      (cardObject) => cardObject.id === data.id,
    );
    cardState[0] = data;

    return state;
  },
  addCardCalendar: (state, data) => {
    const columnid = state.convertedCalendar.inProgessId;
    const cardsArray = state.board.columns.filter(
      (column) => column.id === columnid,
    )[0].cards;

    cardsArray.push(data);
    return state;
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
      return {
        ...state,
        view: data.view,
        convertedBoard: data.convertedBoard,
        convertedCalendar: data.convertedCalendar,
      };
    case ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, data],
        board: data,
        loading: false,
      };
    case CHANGE_BOARD:
      return {
        ...state,
        board: data.newBoard,
        convertedBoard: data.convertedBoard,
        convertedCalendar: data.convertedCalendar,
      };
    case INIT:
      return {
        ...state,
        boards: data.boards,
        board: data.boards[0],
        convertedBoard: data.convertedBoard,
        convertedCalendar: data.convertedCalendar,
        loading: false,
      };
    case SET_ERROR:
      return {...state, loading: false, error: true};
    case SET_LOADING:
      return {...state, loading: true, error: false};
    default:
      return state;
  }
};

export default BoardReducer;
