import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  calendarOuterContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: ' 40px',
    marginLeft: '10px',
    marginRight: '10px',
  },
  sideNav: {
    marginTop: '40px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  sideNavCards: {
    padding: '10px',
    margin: '10px 5px',
  },
  calendarContainer: {
    width: '80%',
    fontSize: '12px',
    marginBottom: theme.spacing(10),
    fontFamily: 'Montserrat, arial',
    '& .cardItem': {
      padding: '10px',
      width: '100%',
      margin: '0 5px',
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
