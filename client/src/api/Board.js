import axios from 'axios';

// Get board
export const getBoards = async () => {
  try {
    const res = await axios.get(`/api/boards/`);
    // eslint-disable-next-line no-console
    console.log('server', res.data);
    return {data: res.data, loading: false, error: false};
  } catch (err) {
    return {data: [], loading: false, error: true};
  }
};
// helper function to convertBoard backend to frontend
// leaving this separate from exported Board because want to keep this private
const convertBoardAPI = async (board) => {
  const newBoard = {
    id: board.id,
    tasks: {},
    columns: {},
    columnOrder: [],
  };

  // eslint-disable-next-line
  await board.columns.map(column => {
    newBoard.columns[column.id] = {
      id: column.id,
      title: column.name,
      taskIds: column.cards.map((card) => card.id),
    };

    // eslint-disable-next-line
    column.cards.map(card => {
      newBoard.tasks[card.id] = {
        id: card.id,
        content: card.name,
      };
    });
    newBoard.columnOrder.push(column.id);
  });
  return newBoard;
};

const Board = {
  getData: async (index) => {
    try {
      const res = await axios.get(`/api/boards/`);
      const convertedBoard = await convertBoardAPI(res.data[index]);
      return {data: convertedBoard, loading: false, error: false};
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
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(formData);

    const res = await axios.post(`/api/boards/create/`, body, config);

    return {data: res.data, error: false};
  } catch (err) {
    return {data: [], error: true};
  }
};
export default Board;
