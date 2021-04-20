import { fetchData } from './fetch';
import URL from '../../helpers/url';
import { getCookie } from '../../helpers/auth';
import { PAYMENT_JWT } from '../../constants/auth';

export const getInstruments = async (clientId, userId) => {
  const response = await fetchData(
    'get',
    URL.paymentListInstruments(clientId, userId),
    null,
    {
      Authorization: `Bearer ${getCookie(PAYMENT_JWT)}`,
    },
  );
  return response;
};

export const preAuthInstrument = async (clientId, userId, data) => {
  const response = await fetchData(
    'post',
    URL.paymentSubmitInstruments(clientId, userId),
    data,
    {
      Authorization: `Bearer ${getCookie(PAYMENT_JWT)}`,
    },
  );
  return response;
};

export const validateInstrument = async (
  clientId,
  userId,
  merchantOrderId,
  data,
) => {
  const response = await fetchData(
    'put',
    URL.validateInstrument(clientId, userId, merchantOrderId),
    data,
    {
      Authorization: `Bearer ${getCookie(PAYMENT_JWT)}`,
    },
  );
  return response;
};

export const createOrder = async (clientId, userId, data) => {
  const response = await fetchData(
    'post',
    URL.createOrder(clientId, userId),
    data,
    {
      Authorization: `Bearer ${getCookie(PAYMENT_JWT)}`,
    },
  );
  return response;
};

export const validateOrder = async (
  clientId,
  userId,
  merchantOrderId,
  data,
) => {
  const response = await fetchData(
    'put',
    URL.validateOrder(clientId, userId, merchantOrderId),
    data,
    {
      Authorization: `Bearer ${getCookie(PAYMENT_JWT)}`,
    },
  );
  return response;
};

export const getPaymentMethods = async (clientId, userId, params) => {
  const response = await fetchData(
    'get',
    URL.getPaymentMethods(clientId, userId, params),
    null,
    {
      Authorization: `Bearer ${getCookie(PAYMENT_JWT)}`,
    },
  );
  return response;
};

export const getMPGSSessionUrl = async jwt => {
  const response = await fetchData(
    'get',
    `${process.env.PAYMENT_SERVICE}${URL.getMPGSSessionUrl}`,
    {},
    {
      Authorization: `Bearer ${jwt}`,
    },
  );

  return response;
};

export const getPaymentPurchaseMethods = async purchaseId => {
  const response = await fetchData(
    'get',
    URL.getPaymentPurchaseMethods(purchaseId),
  );
  return response;
};

export const makePayment = async (purchaseId, data) => {
  const response = await fetchData('post', URL.makePayment(purchaseId), data);
  return response;
};

export const validatePayment = async (purchaseId, data) => {
  const response = await fetchData('put', URL.makePayment(purchaseId), data);
  return response;
};

export const getContentNote = async (localce, types) => {
  const response = await fetchData('get', URL.getContentNote(localce, types));
  return response;
};
