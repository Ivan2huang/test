import reducer, { initialState } from '../reducer';
import {
  UPDATE_INSTRUMENTS,
  SUBMIT_PRE_AUTH,
  CHECK_OUT_ORDER,
  UPDATE_PAYMENT_METHODS,
  UPDATE_PAYMENT_PURCHASE_METHODS,
  MAKE_A_PAYMENT,
} from '../actionTypes';

describe('Payment reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle UPDATE_INSTRUMENTS', () => {
    const action = {
      type: UPDATE_INSTRUMENTS,
      payload: {
        instruments: [],
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      instruments: [],
      isLoadingInstruments: false,
    });
  });

  it('should handle SUBMIT_PRE_AUTH', () => {
    const action = {
      type: SUBMIT_PRE_AUTH,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isSubmittingPreAuth: true,
    });
  });

  it('should handle CHECK_OUT_ORDER', () => {
    const action = {
      type: CHECK_OUT_ORDER,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isCheckingOut: true,
    });
  });

  it('should handle UPDATE_PAYMENT_METHODS', () => {
    const action = {
      type: UPDATE_PAYMENT_METHODS,
      payload: {
        paymentMethods: [],
        isLoadingPaymentMethods: false,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      paymentMethods: [],
      isLoadingPaymentMethods: false,
    });
  });

  it('should handle UPDATE_PAYMENT_PURCHASE_METHODS', () => {
    const action = {
      type: UPDATE_PAYMENT_PURCHASE_METHODS,
      payload: {
        purchasePaymentMethods: [],
        isLoadingPaymentMethods: false,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      purchasePaymentMethods: [],
      isLoadingPaymentMethods: false,
    });
  });

  it('should handle MAKE_A_PAYMENT', () => {
    const action = {
      type: MAKE_A_PAYMENT,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isMakingPayment: true,
    });
  });
});
