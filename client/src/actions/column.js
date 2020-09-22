import axios from 'axios';
import resultData from './data';

// Get current columns
export const getCurrentColumns = async () => {
  try {
    // Todo API request
    // const res = await axios.get('/api/columns');

    return {data: resultData.data, loading: false, error: false};
  } catch (err) {
    return {data: [], loading: false, error: true};
  }
};

// Add column
export const addColumn = async (title) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({name: title});

    const res = await axios.post('/api/columns/create', body, config);

    return {data: res.data, error: false};
  } catch (err) {
    return {data: [], error: true};
  }
};
