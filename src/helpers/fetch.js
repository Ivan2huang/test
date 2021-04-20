/* eslint-disable import/no-cycle */
/* eslint-disable no-console,consistent-return */

import axios from 'axios';
import { navigateTo } from './helpers';
import paths from './paths';
import useAxiosInterceptors from './axiosInterceptors';
import getLocale from '../i18n/getLocale';
import CONFIG from '../constants/config';
import logger from './logger';

if (CONFIG.enableRefreshToken) {
  useAxiosInterceptors(axios);
}

export const ContentTypes = {
  JSON: 'application/json;charset=UTF-8',
  FILE: 'application/x-www-form-urlencoded',
};

export const defaultHeader = () => ({
  accept: ContentTypes.JSON,
  'Content-Type': ContentTypes.JSON,
  'Accept-Language': getLocale(),
  Pragma: 'no-cache',
});

const uploadFileHeader = () => ({
  'Content-Type': ContentTypes.FILE,
});

const handleError = (error, expectsErrorResponse) => {
  let response = false;
  logger.error('fetch -> ERROR', error);
  if (error.response && error.response.data) {
    response =
      error.response.data.errors && error.response.data.errors.length >= 1
        ? {
            error: true,
            ...error.response.data.errors[0],
          }
        : {
            error: true,
            messageKey: error.response.data.code,
            message: error.response.data.message,
          };
  } else if (error && !error.status) {
    // network error
    response = {
      error: true,
      messageKey: 'NETWORK_ERROR',
      message: '',
    };
  }

  if (expectsErrorResponse) {
    return response;
  }

  if (error.response && error.response.status === 404) {
    navigateTo(paths.common.notfound);
  } else {
    navigateTo(paths.common.error);
  }
};

export const fetchData = (
  method,
  url,
  body,
  expectsErrorResponse = false,
  headerOptions = {},
) => {
  return axios(url, {
    headers: {
      ...defaultHeader(),
      ...headerOptions,
    },
    method,
    data: JSON.stringify(body),
  })
    .then(response => response.data)
    .catch(error => handleError(error, expectsErrorResponse));
};

export const uploadFile = (method, url, body, expectsErrorResponse = false) => {
  return axios(url, {
    headers: uploadFileHeader(),
    method,
    data: body,
  })
    .then(response => response.data)
    .catch(error => handleError(error, expectsErrorResponse));
};

export const fetchFile = url => {
  const axiosOption = { responseType: 'blob' };
  return axios(url, axiosOption)
    .then(response => response.data)
    .catch(error => handleError(error, false));
};
