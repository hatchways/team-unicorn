module.exports = {
  addCard: (task, columnId, dispatch) => {
    dispatch({
      type: 'ADD_CARD',
      columnId,
      task,
    });
  },
  moveCard: (prevCol, nextCol, fromIndex, toIndex, dispatch) => {
    dispatch({
      type: 'MOVE_CARD',
      prevCol,
      nextCol,
      fromIndex,
      toIndex,
    });
  },
  addColumn: (col, dispatch) => {
    dispatch({
      type: 'ADD_COL',
      col,
    });
  },
  moveColumn: (fromIndex, toIndex, dispatch) => {
    dispatch({
      type: 'MOVE_COL',
      fromIndex,
      toIndex,
    });
  },
  deleteColumn: (colId, dispatch) => {
    dispatch({
      type: 'DELETE_COL',
      colId,
    });
  },
  initBoard: (board, dispatch) => {
    dispatch({
      type: 'INIT_BOARD',
      boardData: board,
    });
  },
};
