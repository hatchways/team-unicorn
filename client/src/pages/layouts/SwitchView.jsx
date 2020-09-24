import React from 'react';
import {Box, makeStyles, Button} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';

const useStyle = makeStyles((theme) => ({
  link: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const SwitchView = () => {
  const classes = useStyle();
  return (
    <Box>
      <Button
        className={classes.link}
        color="primary"
        variant="outlined"
        startIcon={<DashboardIcon />}
        size="medium"
        component={RouterLink}
        to="/dashboard"
      >
        Dashboard
      </Button>

      <Button
        className={classes.link}
        color="primary"
        variant="outlined"
        startIcon={<CalendarIcon />}
        size="medium"
        component={RouterLink}
        to="/calendar"
      >
        Calendar
      </Button>
    </Box>
  );
};

export default SwitchView;
