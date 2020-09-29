import axios from 'axios';

// Get board
export const getBoard = async () => {
  try {
    const res = await axios.get(`/api/boards/`);
    // eslint-disable-next-line no-console
    console.log('server', res.data);
    return {data: res.data, loading: false, error: false};
  } catch (err) {
    return {data: [], loading: false, error: true};
  }
};

// Save board
export const saveBoard = async (boardId, columnOrder) => {
  try {
    await axios.put(`/api/boards/update/${boardId}`, columnOrder);
    console.log('board saved at:', Date(Date.now()));
  } catch (err) {
    console.error(err);
  }
};
