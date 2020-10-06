import axios from 'axios';
import ApiResultFactory from './ApiResult';

const defaultErrorHandler = (error) => {
  // Check if error is axios error
  if (error.response) {
    const {errors} = error.response.data;
    return ApiResultFactory.withErrors(errors);
  }

  console.log(error.message);
  return {};
};

// post card
export const addCardByColumnId = async (columnId, formData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(formData);

    const res = await axios.post(`/api/cards/${columnId}`, body, config);

    return {data: res.data, error: false};
  } catch (err) {
    return {data: [], error: true};
  }
};

// Get card by Id
export const getCardById = async (id) => {
  try {
    const {data: respData} = await axios.get(`/api/cards/${id}`);

    return ApiResultFactory.withData(respData);
  } catch (err) {
    return {data: [], loading: false, error: true};
  }
};

// Update Card by Id
export const updateCard = async (id, title, details) => {
  try {
    const url = `/api/cards/${id}`;

    const {data} = await axios.put(url, {name: title, details});
    return ApiResultFactory.withData(data);
  } catch (err) {
    return defaultErrorHandler(err);
  }
};
