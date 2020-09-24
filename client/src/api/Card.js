import axios from 'axios';

// Get card by Id
export const getCardById = async (card) => {
  try {
    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
    const res = await axios.get(`/api/cards/show/${card._id}`);

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
    const url = `/api/cards/detail/update/${card._id}`;

    const res = await axios.put(url, body, config);

    return {data: res.data, error: false};
  } catch (err) {
    return {data: [], error: true};
  }
};
