export const convertCalendarAPI = async (board) => {
  const calendarEvents = [];
  const draggableEvents = [];
  let inProgressId;

  board.columns.forEach((column) => {
    if (column.name === 'In Progress') {
      inProgressId = column.id;
    }
    column.cards.forEach((cardObject) => {
      const card = {};
      card.title = cardObject.name;
      card.id = cardObject.id;
      if (cardObject.deadline === undefined) {
        draggableEvents.push(card);
      } else {
        card.start = cardObject.deadline;
        card.end = cardObject.deadline;
        calendarEvents.push(card);
      }
    });
  });

  return {draggableEvents, calendarEvents, inProgressId};
};

export const convertBoardAPI = async (board) => {
  const newBoard = {
    id: board.id,
    tasks: {},
    columns: {},
    columnOrder: [],
  };

  // eslint-disable-next-line
  await board.columns.map((column) => {
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
