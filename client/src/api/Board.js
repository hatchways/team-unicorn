import axios from 'axios';

// Get board
const getBoard = async () => {
  try {
    const res = await axios.get(`/api/boards/`);
    // eslint-disable-next-line no-console
    console.log('server', res.data);
    return {data: res.data, loading: false, error: false};
  } catch (err) {
    return {data: [], loading: false, error: true};
  }
};

export default getBoard;
