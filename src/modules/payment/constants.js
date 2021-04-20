const ADD_NEW_CARD = 'ADD_NEW_CARD';

const PAYMENT_FORM = {
  cardNumber: {
    gridColumns: { xs: 12, md: 12 },
    defaultPlaceholder: 'Card Number',
  },
  expiryMonth: {
    gridColumns: { xs: 6, md: 6 },
    defaultPlaceholder: 'Expiry Month',
  },
  expiryYear: {
    gridColumns: { xs: 6, md: 6 },
    defaultPlaceholder: 'Expiry Year',
  },
  securityCode: {
    gridColumns: { xs: 12, md: 12 },
    defaultPlaceholder: 'Security Code',
    inputType: 'password',
  },
};

const CREDIT_CARD_NUMBER_LENGTH = 16;

const CREDIT_CARD_NUMBER_MASK_CHAR = '*';

const REQUIRED_3DS = 'REQUIRED_3DS';

const ERROR = 'ERROR';

const UNKNOWN = 'UNKNOWN';

const ECONNABORTED = 'ECONNABORTED';

const BACK = 'BACK';

const OPEN_TERM_OF_USE_MESSAGE_TYPE = 'OPEN_TERM_OF_USE';

const CALLBACK_METHOD = {
  GET: 'GET',
  POST: 'POST',
};

const PAYMENT_METHOD_CC_SEPARATOR = '_';

const PAYMENT_CARD_FORM_NAME = 'card';

export {
  ADD_NEW_CARD,
  PAYMENT_FORM,
  CREDIT_CARD_NUMBER_LENGTH,
  CREDIT_CARD_NUMBER_MASK_CHAR,
  REQUIRED_3DS,
  ERROR,
  UNKNOWN,
  ECONNABORTED,
  BACK,
  OPEN_TERM_OF_USE_MESSAGE_TYPE,
  CALLBACK_METHOD,
  PAYMENT_METHOD_CC_SEPARATOR,
  PAYMENT_CARD_FORM_NAME,
};
