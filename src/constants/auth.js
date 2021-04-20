import paths from '../helpers/paths';

export const ID_TOKEN = 'id_token';
export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';
export const LOGGED_IN = 'logged_in';
export const USER_ID = 'user_id';
export const CLIENT_ID = 'client_id';
export const AUTH_CLIENT_ID = 'authClientId';
export const PENDING_ACTIONS = 'pending_actions';
export const PAYMENT_JWT = 'payment_jwt';
export const LANG = 'lang';
export const CUSTOMTOKEN_HEADER = 'cxa-authorization';
export const error = {
  login: {
    messageKeys: {
      Unauthorized: 'login.error.unauthorized',
    },
  },
  token: {
    invalidRefreshToken: 'refresh_token_invalid',
  },
};

export const routesWithoutFetchData = [
  paths.common.accountAcivation,
  paths.common.accountActivationError,
  paths.common.error,
];
