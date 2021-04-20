import actionCreator from '../../../helpers/action';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const VALIDATE_RESET_PASSWORD_REQUEST =
  'VALIDATE_RESET_PASSWORD_REQUEST';
export const GET_PRODUCT_NAME = 'GET_PRODUCT_NAME';
export const UPDATE_PRODUCT_NAME = 'UPDATE_PRODUCT_NAME';

export const resetPassword = actionCreator(
  RESET_PASSWORD,
  'email',
  'password',
  'dateOfBirth',
  'token',
  'isFirstTimeUser',
  'productName',
  'clientId',
);

export const validateResetPasswordRequest = actionCreator(
  VALIDATE_RESET_PASSWORD_REQUEST,
  'email',
  'dateOfBirth',
  'token',
  'clientId',
  'isVerifyingDoB',
);

export const getProductName = actionCreator(
  GET_PRODUCT_NAME,
  'locale',
  'fallbackName',
);
export const updateProductName = actionCreator(
  UPDATE_PRODUCT_NAME,
  'productName',
);
