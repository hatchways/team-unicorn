import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CalendarSideNav from './components/CalendarSideNav';
import CalendarView from './components/CalendarView';
import {BoardContext} from 'contexts/boardContext';

const useStyles = makeStyles(() => ({
  calendarOuterContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: ' 20px',
    marginLeft: '10px',
    marginRight: '10px',
  },
}));
const CalendarActions = () => {
  const {data} = useContext(BoardContext);
  const {draggableEvents} = data.boardView;

  console.log(draggableEvents)
  const classes = useStyles();
  return (
    <div className={classes.calendarOuterContainer}>
      {draggableEvents.length > 0 ? <CalendarSideNav /> : ' '}
      <CalendarView />
    </div>
  );
};

export default CalendarActions;
