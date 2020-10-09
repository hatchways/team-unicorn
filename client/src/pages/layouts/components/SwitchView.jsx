import React, {useContext} from 'react';
import {Box, makeStyles, Button} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';

import {BoardContext} from 'contexts/boardContext';
import boardActions from 'contexts/boardActions';
import {convertCalendarAPI, convertBoardAPI, getCurrentBoard} from 'api/Utils';

const useStyle = makeStyles((theme) => ({
  link: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));


const SwitchView = () => {
  const {data, dispatch} = useContext(BoardContext);
  const classes = useStyle();

  const switchView = async (view, board) => {
    const convertFunc = view === 'dashboard' ? convertBoardAPI : convertCalendarAPI;
    const newBoard = await convertFunc(board)
    await boardActions.switchView(view, newBoard, dispatch)
  }
  
  return (
    <Box>
      <Button
        className={classes.link}
        color="primary"
        startIcon={<DashboardIcon />}
        size="medium"
        onClick={() => switchView('dashboard', getCurrentBoard(data))}
      >
        Dashboard
      </Button>

      <Button
        className={classes.link}
        color="primary"
        startIcon={<CalendarIcon />}
        size="medium"
        onClick={() => switchView('calendar', getCurrentBoard(data))}
      >
        Calendar
      </Button>
    </Box>
  );
};

export default SwitchView;
