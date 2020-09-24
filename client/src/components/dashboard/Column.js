import React from 'react';

import {Paper, Typography} from '@material-ui/core/';

import CardItem from './Card';

const Column = (props) => {
  const {column} = props;
  return (
    <Paper
      variant="outlined"
      className="column"
      square={false}
      elevation={0}
      color="background.paper"
    >
      <div>
        <Typography variant="h5" className="title">
          {column.name}
        </Typography>
        {column.cards.map((card) => (
          // eslint-disable-next-line no-param-reassign, no-underscore-dangle
          <CardItem card={card} key={card._id} />
        ))}
      </div>
    </Paper>
  );
};

export default Column;
