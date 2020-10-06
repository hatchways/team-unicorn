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
