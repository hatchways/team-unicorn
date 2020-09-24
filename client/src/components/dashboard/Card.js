import React, {useState} from 'react';
import {Typography, Card, CardContent} from '@material-ui/core/';
import EditCardDialogForm from '../dashboardForms/EditCardDialogForm';
import {getCardById} from '../../api/Card';

const CardItem = (props) => {
  const {card} = props;
  const [open, setOpen] = useState(false);
  const [cardData, setCardData] = useState(false);
  const [cardLoading, setCardLoading] = useState(true);
  const [cardError, setCardError] = useState(false);

  const getCardData = async () => {
    const payload = await getCardById(card);
    setCardData(payload.data);
    setCardLoading(payload.data.loading);
    setCardError(payload.error);
  };

  const handleClickOpen = () => {
    getCardData();
    if (!cardError) setOpen(true);
  };

  return (
    <div>
      <Card
        className="cardItem"
        color="background.default"
        onClick={handleClickOpen}
      >
        <CardContent>
          <Typography variant="body1">{card.name}</Typography>
        </CardContent>
      </Card>
      {cardError && <div> Something went wrong </div>}
      {!cardLoading && (
        <EditCardDialogForm
          open={open}
          setOpen={setOpen}
          cardData={cardData}
          setCardData={setCardData}
          cardLoading={cardLoading}
          setCardLoading={setCardLoading}
        />
      )}
    </div>
  );
};
export default CardItem;
