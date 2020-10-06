import React from 'react';
import {Box, makeStyles, Button} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';

const useStyle = makeStyles((theme) => ({
  link: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const SwitchView = ({setCurrentView}) => {
  const classes = useStyle();

  return (
    <Box>
      <Button
        className={classes.link}
        color="primary"
        startIcon={<DashboardIcon />}
        size="medium"
        onClick={() => setCurrentView('dashboard')}
      >
        Dashboard
      </Button>

      <Button
        className={classes.link}
        color="primary"
        startIcon={<CalendarIcon />}
        size="medium"
        onClick={() => setCurrentView('calendar')}
      >
        Calendar
      </Button>
    </Box>
  );
};

export default SwitchView;
