const ERROR_CODE = {
  RegistrationTokenInvalid: {
    messageKey: 'activationInvalid.Header.title',
    defaultMessage: 'Invalid registration token',
  },
  RegistrationTokenExpired: {
    messageKey: 'activationExpired.Header.title',
    defaultMessage: 'Link expired',
  },
};

const INITIAL = 'INITIAL';

const UNKNOWN_ERROR = 'UNKNOWN_ERROR';

const VERIFICATION_SUCCESS = 'VERIFICATION_SUCCESS';

export { ERROR_CODE, INITIAL, VERIFICATION_SUCCESS, UNKNOWN_ERROR };
