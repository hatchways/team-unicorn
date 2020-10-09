import axios from 'axios';
import {convertCalendarAPI, convertBoardAPI} from './Utils';
// Get board
export const getBoards = async () => {
  const res = await axios.get(`/api/boards/`);
  const convertedBoard = await convertBoardAPI(res.data[0]);
  const convertedCalendar = await convertCalendarAPI(res.data[0]);
  // eslint-disable-next-line no-console
  console.log('server', res.data);
  return {boards: res.data, convertedBoard, convertedCalendar};
};

const Board = {
  getAllBoards: async () => {
    try {
      const res = await axios.get(`/api/boards/`);
      // const boardIds = res.data.map(board => board._id);
      // // const convertedBoard = await convertBoardAPI(res.data[index]);
      return {data: res.data, loading: false, error: false};
    } catch (err) {
      return {data: [], loading: false, error: true};
    }
  },
  getBoard: async (boardId) => {
    try {
      const res = await axios.get(`/api/boards/${boardId}`);
      // const convertedBoard = await convertBoardAPI(res.data[index]);
      return {data: res.data, loading: false, error: false};
    } catch (err) {
      return {data: [], loading: false, error: true};
    }
  },
  saveData: async (boardId, columnOrder) => {
    try {
      await axios.put(`/api/boards/${boardId}`, columnOrder);
      // eslint-disable-next-line no-console
      console.log('board saved at:', Date(Date.now()));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  },
};

// Add Board
export const addBoard = async (formData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);

  const res = await axios.post(`/api/boards/`, body, config);

  return res;
};
export default Board;
