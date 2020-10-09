import React, {useEffect, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Card, Typography} from '@material-ui/core';
// eslint-disable-next-line no-unused-vars
import FullCalendar from '@fullcalendar/react';
import {Draggable} from '@fullcalendar/interaction';
import {BoardContext} from 'contexts/boardContext';

const useStyles = makeStyles(() => ({
  sideNav: {
    marginTop: '20px',
    marginRight: '10px',
  },
  sideNavCards: {
    cursor: 'pointer',
    padding: '10px',
    margin: '10px 5px',
  },
}));

const CalendarSideNav = () => {
  const {data} = useContext(BoardContext);
  const {draggableEvents} = data.boardView;

  const classes = useStyles();

  useEffect(() => {
    const containerEl = document.getElementById('external-events');
    // eslint-disable-next-line no-unused-vars
    const draggableElements = new Draggable(containerEl, {
      itemSelector: '.dragCardItem',
      eventData(eventEl) {
        return {
          title: eventEl.children[0].innerText,
          id: eventEl.getAttribute('id'),
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        };
      },
    });
  }, []);

  return (
    <div className={classes.sideNav} id="external-events">
      <p>
        <strong>Unscheduled Tasks</strong>
      </p>
      {draggableEvents.map((card) => (
        <Card
          color="background.default"
          key={card.id}
          id={card.id}
          className={`${classes.sideNavCards} dragCardItem`}
        >
          <Typography>{card.title}</Typography>
        </Card>
      ))}
    </div>
  );
};

export default CalendarSideNav;
