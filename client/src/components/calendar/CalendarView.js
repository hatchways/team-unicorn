import React, {useState} from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {Typography, Card} from '@material-ui/core/';

import CalendarStyles from '../styles/CalendarStyles';

import EditCardDialogForm from '../dashboardForms/EditCardDialogForm';
import {getCardById, updateCard} from '../../api/Card';

const CalendarView = ({calendarEvents}) => {
  const classes = CalendarStyles();

  const [open, setOpen] = useState(false);
  const [detailCardData, setDetailCardData] = useState(false);
  const [detailCardError, setDetailCardError] = useState(false);

  const handleEventClick = async (clickInfo) => {
    const payload = await getCardById(clickInfo.event.id);
    setDetailCardData(payload.data);
    setDetailCardError(payload.error);
    if (!detailCardError) setOpen(true);
  };
  const renderEventContent = (eventInfo) => {
    return (
      <>
        <Card className="cardItem" color="background.default">
          <Typography>{eventInfo.event.title}</Typography>
        </Card>
      </>
    );
  };
  const updateDeadline = async (event) => {
    const editedCard = {};
    // eslint-disable-next-line no-underscore-dangle
    editedCard._id = event.id;
    editedCard.deadline = event.start;
    // eslint-disable-next-line no-unused-vars
    const payload = await updateCard(editedCard);
  };
  const handleEventReceive = (receiveInfo) => {
    updateDeadline(receiveInfo.event);
  };
  const handleEventChange = (changeInfo) => {
    updateDeadline(changeInfo.event);
  };
  const handleEventDidMount = () => {
    //  Count events per day
    const eventElements = document.querySelectorAll('.fc-event');

    eventElements.forEach((el) => {
      const dayTopElements =
        el.parentElement.parentElement.parentElement.children[0];

      const dayEventElements = el.parentElement.parentElement;
      const ncards = dayEventElements.querySelectorAll('.fc-event').length;
      const ncardsText = ncards === 1 ? `${ncards} card` : `${ncards} cards`;

      const cardCountElement = dayTopElements.querySelector('.card-count');

      if (cardCountElement === null)
        dayTopElements.innerHTML = `${dayTopElements.innerHTML} <span class='card-count'>${ncardsText}</span>`;
    });
  };
  const handleEventWillUnmount = () => {
    const cardCountElements = document.querySelectorAll('.card-count');
    // Remove count element
    cardCountElements.forEach((el) => {
      el.parentNode.removeChild(el);
    });
  };

  return (
    <>
      <div id="calendar-container" className={classes.calendarContainer}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: '',
            center: 'title',
            right: 'prev,next today',
          }}
          initialView="dayGridMonth"
          eventColor="red"
          editable
          droppable
          eventContent={renderEventContent}
          events={calendarEvents}
          eventClick={handleEventClick}
          eventChange={handleEventChange}
          eventDidMount={handleEventDidMount}
          eventWillUnmount={handleEventWillUnmount}
          eventReceive={handleEventReceive}
          drop={(info) => {
            info.draggedEl.parentNode.removeChild(info.draggedEl);
          }}
        />
      </div>
      {detailCardError && <div> Something went wrong </div>}
      {detailCardData?.name && (
        <EditCardDialogForm
          open={open}
          setOpen={setOpen}
          detailCardData={detailCardData}
        />
      )}
    </>
  );
};

export default CalendarView;
