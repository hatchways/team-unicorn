import React, {useReducer, useEffect} from 'react';
import {getBoards, addBoard} from '../../api/Board';
import {updateCard, addCardByColumnId} from '../../api/Card';
import {convertBoardAPI, convertCalendarAPI} from '../../api/Utils';
import BoardReducer from './boardReducer';
import BoardContext from './boardContext';

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

const initialState = {
  boards: [],
  board: null,
  convertedBoard: [],
  convertedCalendar: null,
  loading: false,
  error: false,
  data: null,
  view: 'dashboard',
};
const BoardState = ({children}) => {
  const [state, dispatch] = useReducer(BoardReducer, initialState);
  // Set loading
  const setLoading = () => dispatch({type: SET_LOADING});

  // Set error
  const setError = () => dispatch({type: SET_ERROR});

  // Load View Data
  const LoadViewData = async (board) => {
    const convertedCalendar = await convertCalendarAPI(board);
    const convertedBoard = await convertBoardAPI(board);

    return {convertedCalendar, convertedBoard};
  };

  useEffect(() => {
    // Get Boards
    const GetBoards = async () => {
      setLoading();
      try {
        const res = await getBoards();

        dispatch({
          type: INIT,
          payload: res,
        });
      } catch (err) {
        setError();
      }
    };
    GetBoards();
  }, []);
  // Update Deadline By Card Id
  const UpdateDeadline = async (card) => {
    const res = await updateCard(card);
    dispatch({type: UPDATECARD_CALENDAR, payload: res.data});
  };

  // Add Card By Column Id
  const AddCardToCalendar = async (card) => {
    const columnid = state.convertedCalendar.inProgessId;
    const res = await addCardByColumnId(columnid, card);

    const cardsArray = state.board.columns.filter(
      (column) => column.id === columnid,
    )[0].cards;

    cardsArray.push(res.data);
    dispatch({
      type: ADDCARD_CALENDAR,
      payload: res.data,
    });
  };

  // Change View
  const ChangeView = async (view) => {
    const {convertedCalendar, convertedBoard} = await LoadViewData(state.board);
    dispatch({
      type: CHANGE_VIEW,
      payload: {view, convertedCalendar, convertedBoard},
    });
  };

  // Change Board
  const ChangeBoard = async (boardId) => {
    const newBoard = [...state.boards].filter(
      (board) => board.id === boardId,
    )[0];
    const {convertedCalendar, convertedBoard} = await LoadViewData(newBoard);
    dispatch({
      type: CHANGE_BOARD,
      payload: {newBoard, convertedCalendar, convertedBoard},
    });
  };

  // Add Board
  const AddBoard = async (board) => {
    setLoading();
    try {
      const res = await addBoard(board);
      dispatch({
        type: ADD_BOARD,
        payload: res.data,
      });
    } catch (err) {
      setError();
    }
  };
  return (
    <BoardContext.Provider
      value={{
        boards: state.boards,
        board: state.board,
        convertedBoard: state.convertedBoard,
        convertedCalendar: state.convertedCalendar,
        loading: state.loading,
        error: state.error,
        view: state.view,
        data: state.data,
        ChangeBoard,
        AddBoard,
        ChangeView,
        AddCardToCalendar,
        UpdateDeadline,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardState;
