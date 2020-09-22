import axios from 'axios';

// Get card by Id
export const getCardById = async (cardId) => {
  try {
    const res = await axios.get(`/api/cards/show/${cardId}`);

    return {data: res.data, loading: false, error: false};
  } catch (err) {
    return {data: [], loading: false, error: true};
  }
};

// Update Card by Id
export const updateCard = async (card) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(card);
    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
    card.id = card._id.toString();

    const res = await axios.put(
      `/api/cards/detail/update/${card.id}`,
      body,
      config,
    );

    return {data: res.data, error: false};
  } catch (err) {
    return {data: [], error: true};
  }
};
