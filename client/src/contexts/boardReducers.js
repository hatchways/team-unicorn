import {updateColumn} from 'api/Column';

const reducers = {
  addCard: (state, task, colId) => {
    const newColumn = {
      ...state.columns[colId],
      taskIds: state.columns[colId].taskIds.concat(task.id),
    };
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      },
    };
    newState.tasks[task.id] = {id: task.id, content: task.name};
    return newState;
  },
  moveCard: (state, prevColId, nextColId, oldIndex, newIndex) => {
    const taskId = state.columns[prevColId].taskIds[oldIndex];

    // remove card from previous column
    const prevTaskIds = Array.from(state.columns[prevColId].taskIds);
    prevTaskIds.splice(oldIndex, 1);
    const prevColumn = {
      ...state.columns[prevColId],
      taskIds: prevTaskIds,
    };

    const newState = {...state};
    // Moving cards within same column
    if (prevColId === nextColId) {
      prevTaskIds.splice(newIndex, 0, taskId);
      newState.columns = {
        ...state.columns,
        [prevColumn.id]: prevColumn,
      };
      updateColumn(prevColumn.id, {cards: prevTaskIds});
    } else {
      // Moving cards between different columns
      const nextTaskIds = Array.from(state.columns[nextColId].taskIds);
      nextTaskIds.splice(newIndex, 0, taskId);
      const nextColumn = {
        ...state.columns[nextColId],
        taskIds: nextTaskIds,
      };

      newState.columns = {
        ...state.columns,
        [prevColumn.id]: prevColumn,
        [nextColumn.id]: nextColumn,
      };
      updateColumn(prevColumn.id, {cards: prevTaskIds});
      updateColumn(nextColumn.id, {cards: nextTaskIds});
    }

    return newState;
  },
  deleteTask: (state) => {
    // TODO
    return state;
  },
  addCol: (state, col) => {
    const newColumns = {
      ...state.columns,
      [col.id]: {id: col.id, title: col.name, taskIds: []},
    };
    const newState = {
      ...state,
      columns: newColumns,
      columnOrder: state.columnOrder.concat(col.id),
    };
    return newState;
  },
  moveCol: (state, fromIndex, toIndex) => {
    const newState = {...state};
    const col = newState.columnOrder[fromIndex];
    newState.columnOrder.splice(fromIndex, 1);
    newState.columnOrder.splice(toIndex, 0, col);

    // await Board.saveData(newState.id, newState.columnOrder);
    return newState;
  },
  changeColTitle: (state, colId, newTitle) => {
    const newColumn = {
      ...state.columns[colId],
      title: newTitle,
    };
    const newColumns = {
      ...state.columns,
      [newColumn.id]: newColumn,
    };
    const newState = {...state, columns: newColumns};
    return newState;
  },
  deleteCol: (state, colId) => {
    // TODO
    const newColumns = {...state.columns};
    delete newColumns[colId];
    const newColumnOrder = [...state.columnOrder].filter(
      (val) => val !== colId,
    );
    return {...state, columns: newColumns, columnOrder: newColumnOrder};
  },
  initBoard: (boardData) => {
    return boardData;
  },
};

export default reducers;
