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

    const res = await axios.post(
      `/api/columns/create/${boardId}`,
      body,
      config,
    );

    return {data: res.data, error: false};
  } catch (err) {
    return {data: [], error: true};
  }
};

export default addColumnByBoardId;
