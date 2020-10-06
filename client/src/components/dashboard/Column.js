import React, {useState} from 'react';

import {Paper, Typography, Button} from '@material-ui/core/';
import AddCardDialogForm from '../dashboardForms/AddCardDialogForm';
import CardItem from './Card';

const Column = ({column}) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
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
        <Button className="addCard" size="large" onClick={handleClickOpen}>
          <Typography>Add a card</Typography>
        </Button>
        {open && (
          <AddCardDialogForm
            open={open}
            setOpen={setOpen}
            // eslint-disable-next-line no-param-reassign, no-underscore-dangle
            columnId={column._id}
          />
        )}
      </div>
    </Paper>
  );
};

export default Column;
