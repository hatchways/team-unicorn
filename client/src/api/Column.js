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
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const resp = await axios.put(
      `/api/columns/${columnId}`,
      updatedColumn,
      config,
    );
    // console.log(
    //   `column ${columnId.substring(
    //     columnId.length - 4,
    //     columnId.length,
    //   )} updated at ${Date(Date.now())}`,
    // );
    return {data: resp.data, error: false};
  } catch (err) {
    return {data: [], error: true};
  }
};

// Delete Column
export const removeColumn = async (colId) => {
  try {
    const res = await axios.delete(`/api/columns/${colId}`, {
      headers: {Authorization: 'token'},
    });
    return {data: res.data, error: false};
  } catch (err) {
    return {data: [], error: true};
  }
};
export default addColumnByBoardId;
