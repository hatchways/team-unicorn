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

const BoardReducer = (state, action) => {
  const data = action.payload;
  switch (action.type) {
    case UPDATECARD_CALENDAR:
      // Todo
      return {
        ...state,
        loading: false,
      };
    case ADDCARD_CALENDAR:
      return {
        ...state,
        data,
      };
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
