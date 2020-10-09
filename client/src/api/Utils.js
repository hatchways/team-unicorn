export const convertCalendarAPI = (board) => {
  const calendarEvents = [];
  const draggableEvents = [];
  let inProgessId;

  board.columns.forEach((column) => {
    if (column.name === 'In Progress') {
      inProgessId = column.id;
    }
    column.cards.forEach((cardObject) => {
      const card = {};
      card.title = cardObject.name;
      card.id = cardObject.id;
      if (cardObject.details && cardObject.details.deadline) {
        card.start = cardObject.details.deadline;
        card.end = cardObject.details.deadline;
        calendarEvents.push(card);
      } else draggableEvents.push(card);
    });
  });
  return {draggableEvents, calendarEvents, inProgessId};
};

export const convertBoardAPI = (board) => {
  const newBoard = {
    id: board.id,
    tasks: {},
    columns: {},
    columnOrder: [],
  };

  // eslint-disable-next-line
  board.columns.map((column) => {
    newBoard.columns[column.id] = {
      id: column.id,
      title: column.name,
      taskIds: column.cards.map((card) => card.id),
    };

    // eslint-disable-next-line
    column.cards.map((card) => {
      newBoard.tasks[card.id] = {
        id: card.id,
        content: card.name,
      };
    });
    newBoard.columnOrder.push(column.id);
  });

  return newBoard;
};
