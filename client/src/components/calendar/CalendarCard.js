import React from 'react';

import {Card, Typography} from '@material-ui/core/';

const CalendarCard = ({eventInfo}) => {
  return (
    <Card className="cardItem" color="background.default">
      <Typography>{eventInfo.event.title}</Typography>
    </Card>
  );
};
export default CalendarCard;
