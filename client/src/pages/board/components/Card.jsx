import React, {useState} from 'react';
import {Typography, Card, CardContent} from '@material-ui/core/';
import EditCardDialogForm from './dashboardForms/EditCardDialogForm';
import {getCardById} from '../../../api/Card';

const CardItem = ({card}) => {
  const [open, setOpen] = useState(false);

  const [detailCardData, setDetailCardData] = useState();
  const [detailCardError, setDetailCardError] = useState(false);

  const getCardData = async () => {
    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
    const payload = await getCardById(card._id);
    setDetailCardData(payload.data);
    setDetailCardError(payload.error);
  };

  const handleClickOpen = () => {
    getCardData();
    if (!detailCardError) setOpen(true);
  };

  return (
    <>
      <Card
        className="cardItem"
        color="background.default"
        onClick={handleClickOpen}
      >
        <CardContent>
          <Typography variant="body1">{card.name}</Typography>
        </CardContent>
      </Card>
      {detailCardError && <div> Something went wrong </div>}
      {detailCardData?.name && (
        <EditCardDialogForm
          open={open}
          setOpen={setOpen}
          detailCardData={detailCardData}
        />
      )}
    </>
  );
};
export default CardItem;
