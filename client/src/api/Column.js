import axios from 'axios';

// Add column
export const addColumnByBoardId = async (boardId, formData) => {
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

// Update column
export const updateColumn = async (columnId, updatedColumn) => {
  try {
    const res = await axios.put(
      `/api/columns/update/${columnId}`,
      updatedColumn,
    );
    return {data: res.data, error: false};
  } catch (err) {
    return {data: [], error: true};
  }
};
