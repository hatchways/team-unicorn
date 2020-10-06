import React, {useState, useEffect} from 'react';
import CalendarSideNav from './CalendarSideNav';
import CalendarView from './CalendarView';
import CalendarStyles from '../styles/CalendarStyles';

const CalendarActions = ({currentBoard}) => {
  const classes = CalendarStyles();
  const [calendarEvents, setCalendarEvents] = useState();
  const [draggableEvents, setDraggableEvents] = useState();
  const [loading, setLoading] = useState(true);
  const [inProgessId, setInProgessId] = useState();

  useEffect(() => {
    const loadData = async () => {
      const cards = [];
      const draggableCards = [];
      currentBoard.columns.forEach((column) => {
        if (column.name === 'In Progress') {
          // eslint-disable-next-line no-param-reassign, no-underscore-dangle
          setInProgessId(column._id);
        }

        column.cards.forEach((cardObject) => {
          const card = {};
          card.title = cardObject.name;
          // eslint-disable-next-line no-param-reassign, no-underscore-dangle
          card.id = cardObject._id;
          if (cardObject.deadline === undefined) {
            draggableCards.push(card);
          } else {
            card.start = cardObject.deadline;
            card.end = cardObject.deadline;
            cards.push(card);
          }
        });
      });
      setDraggableEvents(draggableCards);
      setCalendarEvents(cards);
      setLoading(false);
    };
    if (currentBoard) loadData();
  }, [currentBoard]);
  return (
    <div className={classes.calendarOuterContainer}>
      {!loading && (
        <>
          {draggableEvents?.length > 0 ? (
            <CalendarSideNav draggableEvents={draggableEvents} />
          ) : (
            ' '
          )}
          <CalendarView
            calendarEvents={calendarEvents}
            inProgessId={inProgessId}
          />
        </>
      )}
    </div>
  );
};

export default CalendarActions;
