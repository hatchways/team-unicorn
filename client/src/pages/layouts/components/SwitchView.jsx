import React from 'react';
import {makeStyles, Tabs, Tab} from '@material-ui/core';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';
import CenteringBox from 'components/CenteringBox';

const useStyle = makeStyles((theme) => ({
  tabRoot: {
    textTransform: 'none',
    minHeight: 0,
    minWidth: 36,
    fontWeight: theme.typography.fontWeightRegular,
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
  const classes = useStyle();
  const location = useLocation();

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
          component={RouterLink}
          to="/dashboard"
          classes={tabClasses}
          value="/dashboard"
          label="Dashboard"
          icon={<DashboardIcon fontSize="small" />}
        />
        <Tab
          component={RouterLink}
          to="/calendar"
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
