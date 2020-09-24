import axios from 'axios';

// Get board
const getBoard = async () => {
  try {
    const res = await axios.get(`/api/boards/`);

    return {data: res.data, loading: false, error: false};
  } catch (err) {
    return {data: [], loading: false, error: true};
  }
};

export default getBoard;
