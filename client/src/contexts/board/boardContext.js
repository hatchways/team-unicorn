import {createContext} from 'react';

const initialState = {
  index: 0,
  boards: [],
  board: {},
  convertedBoard: {},
  convertedCalendar: {},
  loading: true,
  error: false,
  view: 'dashboard',
  data: {},
};
const BoardContext = createContext(initialState);

export default BoardContext;
