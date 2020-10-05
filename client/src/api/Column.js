import axios from 'axios';

// Add column
const addColumnByBoardId = async (boardId, formData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(formData);

    const res = await axios.post(`/api/columns/${boardId}`, body, config);

    return {data: res.data, error: false};
  } catch (err) {
    return {data: [], error: true};
  }
};

// Edit Column
export const editColumnTitle = async (colId, title) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const payload = {
      name: title,
    };
    const body = JSON.stringify(payload);
    const res = await axios.put(`/api/columns/${colId}`, body, config);

    return {data: res.data, error: false};
  } catch (err) {
    return {data: [], error: true};
  }
};

// Delete Column
export const removeColumn = async (colId) => {
  try {
    const res = await axios.delete(
      `/api/columns/${colId}`,
      {data: []},
      {headers: {Authorization: 'token'}},
    );
    return {data: res.data, error: false};
  } catch (err) {
    return {data: [], error: true};
  }
};
export default addColumnByBoardId;
