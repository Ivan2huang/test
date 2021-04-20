import actionCreator from '../../helpers/action';
import * as actionTypes from './actionTypes';

export const getInstrument = actionCreator(
  actionTypes.GET_INSTRUMENTS,
  'query',
  'jwt',
);

export const updateInstrument = actionCreator(
  actionTypes.UPDATE_INSTRUMENTS,
  'instruments',
);

export const validateInstrument = actionCreator(
  actionTypes.VALIDATE_INSTRUMENT,
  'paRes',
  'MD',
);

export const submitPreAuth = actionCreator(
  actionTypes.SUBMIT_PRE_AUTH,
  'data',
  'userId',
  'clientId',
  'callBackUrl',
  'jwt',
);

export const updatePaymentPreAuth = actionCreator(
  actionTypes.UPDATE_PAYMENT_PRE_AUTH,
  'paReq',
);

export const validateOrder = actionCreator(
  actionTypes.VALIDATE_ORDER,
  'paRes',
  'MD',
);

export const getPaymentMethods = actionCreator(
  actionTypes.GET_PAYMENT_METHODS,
  'query',
);

export const updatePaymentMethods = actionCreator(
  actionTypes.UPDATE_PAYMENT_METHODS,
  'paymentMethods',
);

export const checkOutOrder = actionCreator(
  actionTypes.CHECK_OUT_ORDER,
  'order',
  'userId',
  'clientId',
  'callBackUrl',
  'jwt',
);

export const goBack = actionCreator(
  actionTypes.GO_BACK,
  'url',
  'callbackMethod',
);

export const getPaymentPurchaseMethods = actionCreator(
  actionTypes.GET_PAYMENT_PURCHASE_METHODS,
  'purchaseId',
  'callbackUrl',
);

export const updatePaymentPurchaseMethods = actionCreator(
  actionTypes.UPDATE_PAYMENT_PURCHASE_METHODS,
  'purchasePaymentMethods',
);

export const makePayment = actionCreator(actionTypes.MAKE_A_PAYMENT, 'data');

export const validatePayment = actionCreator(
  actionTypes.VALIDATE_PAYMENT,
  'paRes',
  'MD',
);

export const getNoteTexts = actionCreator(
  actionTypes.GET_NOTE_TEXTS,
  'keywords',
);
