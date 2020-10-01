import axios from 'axios';

// Get board
export const getBoard = async () => {
  try {
    const {data} = await axios.get(`/api/boards/`);
    // eslint-disable-next-line no-console
    console.log('server', data);

    // convert to react state
    const state = {
      id: data._id,
      tasks: {},
      columns: {},
      columnOrder: [],
    }

    await data.columns.forEach(column => {
      state.columns[column._id] = {
        id: column._id,
        title: column.name,
        taskIds: column.cards.map(card => card._id)
      }
      column.cards.forEach(card => {
        state.tasks[card._id] = {
          id: card._id,
          content: card.name
        }
      })
      state.columnOrder.push(column._id)
    })

    return {data: state, loading: false, error: false};
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
