import React, {useContext} from 'react';
import {makeStyles, Tabs, Tab} from '@material-ui/core';
import {useLocation} from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';
import CenteringBox from 'components/CenteringBox';

import BoardContext from '../../../contexts/board/boardContext';

const useStyle = makeStyles((theme) => ({
  tabRoot: {
    textTransform: 'none',
    minHeight: 0,
    minWidth: 36,
    fontWeight: theme.typography.fontWeightMedium,
  },
  tabWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabelIcon: {
    '& $tabWrapper > *:first-child': {
      marginRight: theme.spacing(1),
      marginBottom: 0,
    },
  },
}));

const SwitchView = () => {
  const {ChangeView} = useContext(BoardContext);
  const location = useLocation();
  const classes = useStyle();
  const tabClasses = {
    root: classes.tabRoot,
    labelIcon: classes.tabLabelIcon,
    wrapper: classes.tabWrapper,
  };

  return (
    <CenteringBox>
      <Tabs
        value={location.pathname}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab
          classes={tabClasses}
          value="/dashboard"
          label="Dashboard"
          icon={<DashboardIcon fontSize="small" />}
          onClick={() => ChangeView('dashboard')}
        />
        <Tab
          onClick={() => ChangeView('calendar')}
          classes={tabClasses}
          value="/calendar"
          label="Calendar"
          icon={<CalendarIcon fontSize="small" />}
        />
      </Tabs>
    </CenteringBox>
  );
};

export default SwitchView;
