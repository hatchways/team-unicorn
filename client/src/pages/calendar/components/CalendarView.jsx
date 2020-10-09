import React, {useState, useContext, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import CalendarCard from './CalendarCard';
import EditCardDialogForm from '../../board/components/dashboardForms/EditCardDialogForm';
import {getCardById} from '../../../api/Card';
import BoardContext from '../../../contexts/board/boardContext';

const useStyles = makeStyles((theme) => ({
  calendarContainer: {
    width: '80%',
    fontSize: '12px',
    marginBottom: theme.spacing(10),
    fontFamily: 'Montserrat, arial',
    '& .cardItem': {
      padding: '10px',
      width: '100%',
      margin: '0 2px',
    },
    '& .fc .fc-daygrid-day-top': {
      flexDirection: 'row',
      alignItems: 'baseline',
      '& a': {
        fontSize: '14px',
        paddingRight: '10px',
        paddingLeft: '5px',
      },
      '& .card-count': {
        color: theme.palette.props.cardSubTitle,
      },
    },
    '& .fc-toolbar-title': {
      fontSize: '22px',
      fontWeight: '600',
    },
    '& .fc-col-header-cell-cushion': {
      fontSize: '12px',
      color: '#9BA9CC',
    },
    '& .fc .fc-scroller-liquid-absolute': {
      position: 'relative',
      background: theme.palette.props.calendarBackground,
    },
  },
}));

const CalendarView = () => {
  const {convertedCalendar, AddCardToCalendar, UpdateDeadline} = useContext(
    BoardContext,
  );
  const {calendarEvents} = convertedCalendar;
  useEffect(() => {
    if (calendarEvents.length === 0) {
      const cardCountElements = document.querySelectorAll('.card-count');
      // Remove count element
      cardCountElements.forEach((el) => {
        el.parentNode.removeChild(el);
      });
    }
  }, [calendarEvents]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [detailCardData, setDetailCardData] = useState(false);
  const [detailCardError, setDetailCardError] = useState(false);

  const handleEventClick = async (clickInfo) => {
    const payload = await getCardById(clickInfo.event.id);
    setDetailCardData(payload.data);
    setDetailCardError(payload.error);
    if (!detailCardError) setOpen(true);
  };

  const handleEventDateClick = async (info) => {
    const calendarApi = info.view.calendar;
    const name = 'Add title ...';
    const deadline = info.date.getTime();

    const payloadResultData = await AddCardToCalendar({
      name,
      deadline,
    });

    // AddEvent to CalendarAPI
    if (payloadResultData) {
      calendarApi.addEvent({
        title: name,
        start: deadline,
        id: payloadResultData.id,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      });
    }
  };

  const renderEventContent = (eventInfo) => {
    return <CalendarCard eventInfo={eventInfo} />;
  };

  const handleEventChange = async (info) => {
    const changeEvent = info.event;
    const editedCard = {};
    editedCard.id = changeEvent.id;
    editedCard.title = changeEvent.title;
    editedCard.details = {};
    editedCard.details.deadline = changeEvent.start.getTime();

    UpdateDeadline(editedCard);
  };

  const handleEventDidMount = () => {
    const cardCountElements = document.querySelectorAll('.card-count');
    // Remove count element
    cardCountElements.forEach((el) => {
      el.parentNode.removeChild(el);
    });

    //  Count events per day
    const eventElements = document.querySelectorAll('.fc-event');

    eventElements.forEach((el) => {
      const dayGridElement = el.parentElement.parentElement.parentElement;
      const dayTopElement = dayGridElement.querySelector('.fc-daygrid-day-top');
      if (dayTopElement !== null) {
        const cardCountElement = dayTopElement.querySelector('.card-count');
        if (cardCountElement === null) {
          const dayEventElement = el.parentElement.parentElement;
          const ncards = dayEventElement.querySelectorAll('.fc-event').length;
          const ncardsText =
            ncards === 1 ? `${ncards} card` : `${ncards} cards`;

          dayTopElement.innerHTML = `${dayTopElement.innerHTML} <span class='card-count'>${ncardsText}</span>`;
        }
      }
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
          dayMaxEventRows
          editable
          droppable
          eventContent={renderEventContent}
          events={calendarEvents}
          eventClick={handleEventClick}
          dateClick={handleEventDateClick}
          eventChange={handleEventChange}
          eventReceive={handleEventChange}
          eventDidMount={handleEventDidMount}
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
