import { fetchData } from '../../../helpers/fetch';
import URL from '../../../helpers/url';

export const resetPassword = (clientId, resetPasswordObj) =>
  fetchData(
    'post',
    URL.resetPassword(clientId),
    resetPasswordObj,
    { 'Content-Type': 'application/json' },
    true,
  );

export const validateResetPasswordRequest = (
  clientId,
  resetPasswordRequestObj,
) => {
  return fetchData(
    'post',
    URL.validateResetPasswordRequest(clientId),
    resetPasswordRequestObj,
    { 'Content-Type': 'application/json' },
    true,
  );
};

export const getProductName = locale => {
  return fetchData('get', URL.getProductName(), null, false, {
    'Accept-Language': locale,
  });
};
