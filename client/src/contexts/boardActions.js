module.exports = {
  addCard: (task, columnId, dispatch) => {
    dispatch({
      type: 'ADD_CARD',
      columnId,
      task,
    });
  },
  moveCard: async (prevCol, nextCol, fromIndex, toIndex, dispatch) => {
    await dispatch({
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
  initBoard: async (boards, board, dispatch) => {
    await dispatch({
      type: 'INIT_BOARD',
      boards,
      board,
    });
  },
  switchBoard: (board, dispatch) => {
    dispatch({
      type: 'SWITCH_BOARD',
      board,
    });
  },
  switchView: (view, boardView, dispatch) => {
    dispatch({
      type: 'SWITCH_VIEW',
      view,
      boardView
    });
  },
  addBoard: (newBoard, dispatch) => {
    dispatch({type: 'ADD_BOARD', newBoard});
  },
  addCardToCal: (card, dispatch) => {
    dispatch({
      type: 'ADD_CARD_TO_CAL',
      card,
    })
  },
  updateDeadline: (card, dispatch) => {
    dispatch({
      type: 'UPDATE_DEADLINE',
      card,
    })
  }
};
