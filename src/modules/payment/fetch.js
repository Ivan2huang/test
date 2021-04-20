import axios from 'axios';

import { UNKNOWN, ERROR } from './constants';
import { defaultHeader } from '../../helpers/fetch';
import { captureException } from '../../helpers/helpers';

const formatErrors = responseData => {
  let errors = [];
  if (responseData.errors && responseData.errors.length >= 1) {
    errors = [...responseData.errors];
  } else {
    errors.push({
      messageKey: responseData.code,
      message: responseData.message,
    });
  }

  return {
    status: ERROR,
    errors,
  };
};

const handleError = error => {
  captureException(error);

  const unknownData = {
    status: UNKNOWN,
  };

  if (error.response && error.response.data) {
    const { data } = error.response;

    // payment errors
    return {
      error: true,
      data: formatErrors(data),
    };
  }

  // another unexpected and timeout errors
  return {
    error: true,
    data: unknownData,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const fetchData = (method, url, body, headers) => {
  return axios(url, {
    headers: {
      ...defaultHeader(),
      ...headers,
    },
    method,
    data: JSON.stringify(body),
  })
    .then(response => response.data)
    .catch(error => handleError(error));
};
