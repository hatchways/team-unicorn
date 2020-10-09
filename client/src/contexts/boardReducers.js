import {updateColumn} from 'api/Column';
import Board from 'api/Board';
import {convertCalendarAPI, convertBoardAPI, getCurrentBoard} from 'api/Utils';

const reducers = {
  addCard: (state, task, colId) => {
    const {boardView} = state;
    const newColumn = {
      ...boardView.columns[colId],
      taskIds: boardView.columns[colId].taskIds.concat(task.id),
    };
    const newState = {
      ...boardView,
      columns: {
        ...boardView.columns,
        [newColumn.id]: newColumn,
      },
    };
    newState.tasks[task.id] = {id: task.id, content: task.name};
    return {...state, boardView: newState};
  },
  moveCard: (state, prevColId, nextColId, oldIndex, newIndex) => {
    const {boardView} = state;
    const taskId = boardView.columns[prevColId].taskIds[oldIndex];

    // remove card from previous column
    const prevTaskIds = Array.from(boardView.columns[prevColId].taskIds);
    prevTaskIds.splice(oldIndex, 1);
    const prevColumn = {
      ...boardView.columns[prevColId],
      taskIds: prevTaskIds,
    };

    const newState = {...boardView};
    // Moving cards within same column
    if (prevColId === nextColId) {
      prevTaskIds.splice(newIndex, 0, taskId);
      newState.columns = {
        ...boardView.columns,
        [prevColumn.id]: prevColumn,
      };
      updateColumn(prevColumn.id, {cards: prevTaskIds});
    } else {
      // Moving cards between different columns
      const nextTaskIds = Array.from(boardView.columns[nextColId].taskIds);
      nextTaskIds.splice(newIndex, 0, taskId);
      const nextColumn = {
        ...boardView.columns[nextColId],
        taskIds: nextTaskIds,
      };

      newState.columns = {
        ...boardView.columns,
        [prevColumn.id]: prevColumn,
        [nextColumn.id]: nextColumn,
      };
      updateColumn(prevColumn.id, {cards: prevTaskIds});
      updateColumn(nextColumn.id, {cards: nextTaskIds});
    }

    return {...state, boardView: newState};
  },
  deleteTask: (state) => {
    // TODO
    return state;
  },
  addCol: (state, col) => {
    const {boardView} = state;
    const newColumns = {
      ...boardView.columns,
      [col.id]: {id: col.id, title: col.name, taskIds: []},
    };
    const newState = {
      ...boardView,
      columns: newColumns,
      columnOrder: boardView.columnOrder.concat(col.id),
    };
    return {...state, boardView: newState};
  },
  moveCol: (state, fromIndex, toIndex) => {
    const {boardView} = state;
    const newColumnOrder = Array.from(boardView.columnOrder);
    const col = newColumnOrder[fromIndex];
    newColumnOrder.splice(fromIndex, 1);
    newColumnOrder.splice(toIndex, 0, col);

    const newBoardState = {...boardView, columnOrder: newColumnOrder};
    // await Board.saveData(newState.id, newState.columnOrder);
    return {...state, boardView: newBoardState};
  },
  changeColTitle: (state, colId, newTitle) => {
    const {boardView} = state;
    const newColumn = {
      ...boardView.columns[colId],
      title: newTitle,
    };
    const newColumns = {
      ...boardView.columns,
      [newColumn.id]: newColumn,
    };
    const newBoardState = {...boardView, columns: newColumns};
    return {...state, boardView: newBoardState};
  },
  deleteCol: (state, colId) => {
    // TODO
    const {boardView} = state;
    const newColumns = {...boardView.columns};
    delete newColumns[colId];
    const newColumnOrder = [...boardView.columnOrder].filter(
      (val) => val !== colId,
    );
    const newBoardState = {
      ...boardView,
      columns: newColumns,
      columnOrder: newColumnOrder,
    };
    return {...state, boardView: newBoardState};
  },
  initBoard: (boards, board) => {
    return {boards: boards.data, view: 'dashboard', boardView: board};
  },
  switchBoard: (state, board) => {
    // const convertedBoard = state.view === 'dashboard' ? : convertCalendarAPI(board)
    return {...state, boardView: board};
  },
  switchView: (state, boardView, view) => {
    if (!boardView) {
      console.log(state)
      return state;
    }
    return {...state, view, boardView};
  },
  addBoard: (state, newBoard) => {
    return {...state, boards: state.boards.concat(newBoard)}
  },
  addCardToCal: (state, card) => {
    // const newCurrentBoard = getCurrentBoard(state)
    // newCurrentBoard.columns.filter(col=>col.name==='In Progress').cards.push(card)
    // return {...state, boards: state.boards.filter(board=>board.id !== newCurrentBoard.id).push(newCurrentBoard)}
  },
  updateDeadline: (state, card) => {
    return state;
  }
};

export default reducers;
