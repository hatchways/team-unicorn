import React, {useEffect} from 'react';
import {Card, Typography} from '@material-ui/core';
// eslint-disable-next-line no-unused-vars
import FullCalendar from '@fullcalendar/react';
import {Draggable} from '@fullcalendar/interaction';

import CalendarStyles from '../styles/CalendarStyles';

const CalendarSideNav = ({draggableEvents}) => {
  const classes = CalendarStyles();

  useEffect(() => {
    const containerEl = document.getElementById('external-events');
    // eslint-disable-next-line no-unused-vars
    const draggableElements = new Draggable(containerEl, {
      itemSelector: '.dragCardItem',
      eventData(eventEl) {
        return {
          title: eventEl.children[0].innerText,
          id: eventEl.getAttribute('id'),
          backgroundColor: eventEl.getAttribute('backgroundColor'),
          borderColor: eventEl.getAttribute('borderColor'),
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
          backgroundColor={card.backgroundColor}
          borderColor={card.borderColor}
          className={`${classes.sideNavCards} dragCardItem`}
        >
          <Typography>{card.title}</Typography>
        </Card>
      ))}
    </div>
  );
};

export default CalendarSideNav;
