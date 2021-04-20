/* eslint-disable no-param-reassign */
import produce from 'immer';

import createReducer from '../../helpers/reducer';
import {
  UPDATE_INSTRUMENTS,
  SUBMIT_PRE_AUTH,
  UPDATE_PAYMENT_METHODS,
  CHECK_OUT_ORDER,
  UPDATE_PAYMENT_PURCHASE_METHODS,
  MAKE_A_PAYMENT,
} from './actionTypes';

export const initialState = {
  instruments: [],
  isSubmittingPreAuth: false,
  isLoadingInstruments: true,
  paymentMethods: [],
  isLoadingPaymentMethods: true,
  isCheckingOut: false,
  purchasePaymentMethods: {},
  isMakingPayment: false,
};

const updateInstruments = produce((draft, action) => {
  const { instruments } = action.payload;

  draft.instruments = instruments;
  draft.isLoadingInstruments = false;
});

const onSubmitPreAuth = produce(draft => {
  draft.isSubmittingPreAuth = true;
});

const updatePaymentMethods = produce((state, action) => {
  const { paymentMethods } = action.payload;

  return {
    ...state,
    paymentMethods,
    isLoadingPaymentMethods: false,
  };
});

const updatePaymentPurchaseMethods = produce((state, action) => {
  const { purchasePaymentMethods } = action.payload;

  return {
    ...state,
    purchasePaymentMethods,
    isLoadingPaymentMethods: false,
  };
});

const checkOutOrder = produce(state => {
  return {
    ...state,
    isCheckingOut: true,
  };
});

const makePayment = produce(state => {
  return {
    ...state,
    isMakingPayment: true,
  };
});

const reducer = createReducer(initialState, {
  [UPDATE_INSTRUMENTS]: updateInstruments,
  [SUBMIT_PRE_AUTH]: onSubmitPreAuth,
  [UPDATE_PAYMENT_METHODS]: updatePaymentMethods,
  [CHECK_OUT_ORDER]: checkOutOrder,
  [UPDATE_PAYMENT_PURCHASE_METHODS]: updatePaymentPurchaseMethods,
  [MAKE_A_PAYMENT]: makePayment,
});

export default reducer;
