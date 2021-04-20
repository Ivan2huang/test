import { takeLatest, takeLeading, call, put, all } from 'redux-saga/effects';
import get from 'lodash/get';
import paymentSaga, {
  getInstrumentSaga,
  submitPreAuthSaga,
  validateInstrumentSaga,
  checkOutOrderSaga,
  validateOrderSaga,
  RESPONSE_URL,
  CHECK_OUT_RESPONSE_URL,
  getResponseUrl,
  getPaymentMethodsSaga,
  goBackSaga,
  getPaymentPurchaseMethodsSaga,
  makePaymentSaga,
  validatePaymentSaga,
  MAKE_PAYMENT_RESPONSE_URL,
} from '../saga';
import {
  GET_INSTRUMENTS,
  VALIDATE_INSTRUMENT,
  SUBMIT_PRE_AUTH,
  CHECK_OUT_ORDER,
  VALIDATE_ORDER,
  GET_PAYMENT_METHODS,
  GO_BACK,
  GET_PAYMENT_PURCHASE_METHODS,
  MAKE_A_PAYMENT,
  VALIDATE_PAYMENT,
} from '../actionTypes';
import {
  getInstruments,
  preAuthInstrument,
  validateInstrument,
  createOrder,
  validateOrder,
  getPaymentMethods,
  getPaymentPurchaseMethods,
  makePayment,
  validatePayment,
  getContentNote,
} from '../api';
import {
  updateInstrument,
  updatePaymentMethods,
  updatePaymentPurchaseMethods,
} from '../action';
import { REQUIRED_3DS } from '../constants';
import { PAYMENT_METHODS } from '../../../constants/types';

jest.mock('lodash/get');

jest.mock('../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

jest.mock('../api', () => ({
  getInstruments: jest.fn(),
  preAuthInstrument: jest.fn(),
  validateInstrument: jest.fn(),
  createOrder: jest.fn(),
  validateOrder: jest.fn(),
  getPaymentMethods: jest.fn(),
  getPaymentPurchaseMethods: jest.fn(),
  makePayment: jest.fn(),
  validatePayment: jest.fn(),
  getContentNote: jest.fn(),
}));

jest.mock('../../../constants/config', () => ({
  enableSentryPayment: true,
}));

window.HTMLFormElement.prototype.submit = () => {};

describe('Payment saga', () => {
  const paRes = 'paaaa';
  const userId = 3;
  const clientId = 'ocbc2';
  const callBackUrl = 'http://redirect.com';
  const MD = 'm&d';
  const merchantOrderId = 123;
  const instrumentId = 1;
  const timestamp = '1575535239542';
  const digest = '1355677974';
  const purchaseId = 'purchaseId';
  Object.fromEntries = l => l.reduce((a, [k, v]) => ({ ...a, [k]: v }), {});
  window.open = jest.fn();

  it('should watch action', () => {
    const generator = paymentSaga();

    const next = generator.next();

    expect(next.value).toEqual(
      all([
        takeLatest(GET_INSTRUMENTS, getInstrumentSaga),
        takeLeading(SUBMIT_PRE_AUTH, submitPreAuthSaga),
        takeLeading(VALIDATE_INSTRUMENT, validateInstrumentSaga),
        takeLeading(VALIDATE_ORDER, validateOrderSaga),
        takeLatest(GET_PAYMENT_METHODS, getPaymentMethodsSaga),
        takeLeading(CHECK_OUT_ORDER, checkOutOrderSaga),
        takeLeading(GO_BACK, goBackSaga),
        takeLatest(GET_PAYMENT_PURCHASE_METHODS, getPaymentPurchaseMethodsSaga),
        takeLeading(MAKE_A_PAYMENT, makePaymentSaga),
        takeLeading(VALIDATE_PAYMENT, validatePaymentSaga),
      ]),
    );
  });

  describe('getResponseUrl', () => {
    const path = 'path';
    let windowSpy;

    beforeEach(() => {
      windowSpy = jest.spyOn(global, 'window', 'get');
    });

    afterEach(() => {
      windowSpy.mockRestore();
    });

    it('should return undefined if there is no window object', () => {
      windowSpy.mockImplementation(() => undefined);
      const expected = '';

      const result = getResponseUrl(path);

      expect(result).toBe(expected);
    });

    it('should return correct path', () => {
      const origin = 'http://localhost';
      const expected = `${origin}/${path}`;
      windowSpy.mockImplementation(() => ({
        location: {
          origin,
        },
      }));

      const result = getResponseUrl(path);

      expect(result).toStrictEqual(expected);
    });
  });

  describe('getInstrumentSaga', () => {
    it('should handle get instrument list with all success scenarios', () => {
      const payload = {
        query: {
          clientId: '3',
          userId: '3',
        },
      };
      const instrumentListResponse = {
        height: 160,
        weight: 40,
        waistCircumference: null,
        ethnicity: 'EastAsian',
        smokingBehaviour: 'NonSmoker',
      };
      const generator = getInstrumentSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);
      next = generator.next();
      expect(next.value).toEqual(
        call(getInstruments, payload.query.clientId, payload.query.userId),
      );
      next = generator.next(instrumentListResponse);
      expect(next.value).toEqual(put(updateInstrument(instrumentListResponse)));
      next = generator.next();
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });

    it('should not update instrument list if error occur', () => {
      const payload = {
        query: {
          clientId: '3',
          userId: '3',
        },
      };
      const generator = getInstrumentSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);
      next = generator.next();
      expect(next.value).toEqual(
        call(getInstruments, payload.query.clientId, payload.query.userId),
      );
      next = generator.next({ error: true });
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });
  });

  describe('submitPreAuthSaga', () => {
    it('should submit the instrument successfully', () => {
      const payload = {
        data: {
          instrumentId,
          redirectUrl: RESPONSE_URL,
        },
        userId,
        clientId,
        callBackUrl: RESPONSE_URL,
      };
      const response = {
        id: 123,
        threeDs: {
          acsUrl: 'acsUrl',
          paReq: 'paReq',
        },
      };
      const generator = submitPreAuthSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);
      next = generator.next();
      expect(next.value).toEqual(
        call(preAuthInstrument, payload.clientId, payload.userId, payload.data),
      );
      next = generator.next(response);
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });

    it('should handle the error case', () => {
      const payload = {
        data: {
          instrumentId,
          redirectUrl: RESPONSE_URL,
        },
        userId,
        clientId,
        callBackUrl: RESPONSE_URL,
      };
      const response = {
        error: {},
      };
      const generator = submitPreAuthSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);
      next = generator.next();
      expect(next.value).toEqual(
        call(preAuthInstrument, payload.clientId, payload.userId, payload.data),
      );
      next = generator.next(response);
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });
  });

  describe('validateInstrumentSaga', () => {
    it('should validate the instrument successfully', () => {
      const payload = {
        paRes,
        MD: `timestamp==${timestamp}&&merchantOrderId==${merchantOrderId}&&digest==${digest}&&clientId==${clientId}&&merchantOrderId==${merchantOrderId}&&callBackUrl==${callBackUrl}&&userId==${userId}`,
      };
      const response = {
        paRes,
        MD,
      };
      const generator = validateInstrumentSaga({ payload });

      let next = generator.next();
      expect(next.value).toEqual(
        call(
          validateInstrument,
          clientId,
          userId.toString(),
          merchantOrderId.toString(),
          {
            paRes,
            MD: `timestamp=${timestamp}&merchantOrderId=${merchantOrderId}&digest=${digest}`,
          },
        ),
      );
      next = generator.next(response);
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });

    it('should handle the error case', () => {
      const payload = {
        paRes,
        MD: `timestamp==${timestamp}&&merchantOrderId==${merchantOrderId}&&digest==${digest}&&clientId==${clientId}&&merchantOrderId==${merchantOrderId}&&callBackUrl==${callBackUrl}&&userId==${userId}`,
      };
      const response = {
        error: {},
      };
      const generator = validateInstrumentSaga({ payload });

      let next = generator.next();
      expect(next.value).toEqual(
        call(
          validateInstrument,
          clientId,
          userId.toString(),
          merchantOrderId.toString(),
          {
            paRes,
            MD: `timestamp=${timestamp}&merchantOrderId=${merchantOrderId}&digest=${digest}`,
          },
        ),
      );
      next = generator.next(response);
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });

    it('should handle the try catch exception', () => {
      const payload = {
        paRes,
        MD: `timestamp==${timestamp}&&merchantOrderId==${merchantOrderId}&&digest==${digest}&&clientId==${clientId}&&merchantOrderId==${merchantOrderId}&&callBackUrl==${callBackUrl}&&userId==${userId}`,
      };
      validateInstrument.mockImplementation(() => {
        return new Promise(resolve => {
          resolve(undefined);
        });
      });
      const generator = validateInstrumentSaga({ payload });

      let next = generator.next();
      expect(next.value).toEqual(
        call(
          validateInstrument,
          clientId,
          userId.toString(),
          merchantOrderId.toString(),
          {
            paRes,
            MD: `timestamp=${timestamp}&merchantOrderId=${merchantOrderId}&digest=${digest}`,
          },
        ),
      );
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });
  });

  describe('checkOutOrderSaga', () => {
    it('should check out successfully', () => {
      const payload = {
        order: {
          redirectUrl: CHECK_OUT_RESPONSE_URL,
        },
        clientId,
        userId,
        callBackUrl,
      };
      const response = {
        threeDs: {
          acsUrl: 'acsUrl',
          paReq: 'paReq',
        },
      };
      const generator = checkOutOrderSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);
      next = generator.next();
      expect(next.value).toEqual(
        call(createOrder, payload.clientId, payload.userId, payload.order),
      );
      next = generator.next(response);
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });

    it('should check out successfully with three3ds required', () => {
      const payload = {
        order: {
          redirectUrl: CHECK_OUT_RESPONSE_URL,
        },
        clientId,
        userId,
        callBackUrl,
      };
      const response = {
        threeDs: {
          acsUrl: 'acsUrl',
          paReq: 'paReq',
        },
        status: REQUIRED_3DS,
        paymentMethods: [
          {
            paymentMethod: PAYMENT_METHODS.WALLET,
            amount: {
              value: 700,
              currency: 'IDR',
            },
          },
          {
            paymentMethod: PAYMENT_METHODS.CREDIT_CARD,
            originalAmount: {
              value: 300,
              currency: 'IDR',
            },
            amount: {
              value: 0.029,
              currency: 'SGD',
            },
            cards: [
              {
                id: 1,
                paymentMethod: 'Credit Card',
                card: {
                  maskedCreditCardNumber: '0008',
                  creditCardType: 'VISA',
                },
              },
            ],
          },
        ],
      };
      const generator = checkOutOrderSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);
      next = generator.next();
      expect(next.value).toEqual(
        call(createOrder, clientId, userId, payload.order),
      );
      get.mockReturnValueOnce(true);
      next = generator.next(response);
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });

    it('should redirect when three3ds required and credit card not found', () => {
      const payload = {
        order: {
          redirectUrl: CHECK_OUT_RESPONSE_URL,
        },
        clientId,
        userId,
        callBackUrl,
      };
      const response = {
        threeDs: {
          acsUrl: 'acsUrl',
          paReq: 'paReq',
        },
        status: REQUIRED_3DS,
        paymentMethods: [],
      };
      const generator = checkOutOrderSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);
      next = generator.next();
      expect(next.value).toEqual(
        call(createOrder, clientId, userId, payload.order),
      );

      next = generator.next(response);
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });

    it('should handle the error case', () => {
      const payload = {
        order: {
          redirectUrl: CHECK_OUT_RESPONSE_URL,
        },
        clientId,
        userId,
        callBackUrl,
      };
      const response = {
        error: {},
      };
      const generator = checkOutOrderSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);
      next = generator.next();
      expect(next.value).toEqual(
        call(createOrder, clientId, userId, payload.order),
      );
      next = generator.next(response);
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });
  });

  describe('validateOrderSaga', () => {
    it('should validate the order successfully', () => {
      const payload = {
        paRes,
        MD: `timestamp==${timestamp}&&merchantOrderId==${merchantOrderId}&&digest==${digest}&&clientId==${clientId}&&merchantOrderId==${merchantOrderId}&&callBackUrl==${callBackUrl}&&userId==${userId}`,
      };
      const response = {
        paRes: 'paRes',
      };
      const generator = validateOrderSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);
      next = generator.next();
      expect(next.value).toEqual(
        call(
          validateOrder,
          clientId,
          userId.toString(),
          merchantOrderId.toString(),
          {
            paRes,
            MD: `timestamp=${timestamp}&merchantOrderId=${merchantOrderId}&digest=${digest}`,
          },
        ),
      );
      next = generator.next(response);
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });

    it('should handle the error case', () => {
      const payload = {
        paRes,
        MD: `timestamp==${timestamp}&&merchantOrderId==${merchantOrderId}&&digest==${digest}&&clientId==${clientId}&&merchantOrderId==${merchantOrderId}&&callBackUrl==${callBackUrl}&&userId==${userId}`,
      };
      const response = {
        error: {},
      };
      const generator = validateOrderSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);
      next = generator.next();
      expect(next.value).toEqual(
        call(
          validateOrder,
          clientId,
          userId.toString(),
          merchantOrderId.toString(),
          {
            paRes,
            MD: `timestamp=${timestamp}&merchantOrderId=${merchantOrderId}&digest=${digest}`,
          },
        ),
      );
      next = generator.next(response);
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });

    it('should handle the try catch exception', () => {
      const payload = {
        paRes,
        MD: `timestamp==${timestamp}&&merchantOrderId==${merchantOrderId}&&digest==${digest}&&clientId==${clientId}&&merchantOrderId==${merchantOrderId}&&callBackUrl==${callBackUrl}&&userId==${userId}`,
      };
      const response = undefined;
      const generator = validateOrderSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);
      next = generator.next();
      expect(next.value).toEqual(
        call(
          validateOrder,
          clientId,
          userId.toString(),
          merchantOrderId.toString(),
          {
            paRes,
            MD: `timestamp=${timestamp}&merchantOrderId=${merchantOrderId}&digest=${digest}`,
          },
        ),
      );
      next = generator.next(response);
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });
  });

  describe('getPaymentMethodsSaga', () => {
    it('should get payment successfully', () => {
      const payload = {
        query: {
          clientId: 1,
          userId: 1,
          amount: '1',
          currency: '$',
        },
      };

      const generator = getPaymentMethodsSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);

      next = generator.next();
      expect(next.value).toEqual(
        call(getPaymentMethods, payload.query.clientId, payload.query.userId, {
          amount: '1',
          currency: '$',
        }),
      );
      next = generator.next([]);
      expect(next.value).toEqual(put(updatePaymentMethods([])));
      next = generator.next();
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });

    it('should not update payment methods if error', () => {
      const payload = {
        query: {
          clientId: 1,
          userId: 1,
          amount: '1',
          currency: '$',
        },
      };

      const generator = getPaymentMethodsSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);

      next = generator.next();
      expect(next.value).toEqual(
        call(getPaymentMethods, payload.query.clientId, payload.query.userId, {
          amount: '1',
          currency: '$',
        }),
      );
      next = generator.next({ error: true });
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });
  });

  describe('goBackSaga', () => {
    it('should post data to callbackurl', () => {
      const payload = {
        url: 'test.com',
      };

      const generator = goBackSaga({ payload });
      generator.next();

      const form = document.querySelector('form[action="test.com"');

      expect(form.length).toBe(1);
    });

    it('should open callbackurl', () => {
      const payload = {
        url: 'test.com',
        callbackMethod: 'GET',
      };

      const generator = goBackSaga({ payload });
      generator.next();

      expect(window.open).toHaveBeenCalledWith('test.com', '_self');
    });
  });

  describe('getPaymentPurchaseMethodsSaga', () => {
    it('should get payment successfully', () => {
      const payload = {
        purchaseId: 'purchaseId',
      };
      const response = {
        extData: {
          paymentFootnoteType: 'paymentFootnoteType',
          paymentInstructionInsufficientType:
            'paymentInstructionInsufficientType',
          paymentInstructionSufficientType: 'paymentInstructionSufficientType',
        },
      };
      const generator = getPaymentPurchaseMethodsSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);

      next = generator.next();
      expect(next.value).toEqual(call(getPaymentPurchaseMethods, 'purchaseId'));
      next = generator.next(response);
      expect(next.value).toEqual(
        call(getContentNote, undefined, [
          'paymentFootnoteType',
          'paymentInstructionInsufficientType',
          'paymentInstructionSufficientType',
        ]),
      );
      next = generator.next([]);
      expect(next.value).toEqual(put(updatePaymentPurchaseMethods(response)));
      next = generator.next();
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });

    it('should redirect to callbackUrl when error occur', () => {
      const payload = {
        purchaseId: 'purchaseId',
        callbackUrl: 'callbackUrl',
      };

      const generator = getPaymentPurchaseMethodsSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);

      next = generator.next();
      expect(next.value).toEqual(call(getPaymentPurchaseMethods, 'purchaseId'));
      next = generator.next({
        error: true,
      });
      expect(window.open).toHaveBeenCalledWith('callbackUrl', '_self');
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });
  });

  describe('makePaymentSaga', () => {
    it('should make payment successfully', () => {
      const payload = {
        data: {
          order: {
            redirectUrl: MAKE_PAYMENT_RESPONSE_URL,
            merchantOrderId,
            amount: {
              value: 1,
              currency: 'HKD',
            },

            payment: {
              paymentMethod: 'paymentMethod',
              paymentProcessors: [
                {
                  amount: { currency: 'HKD', value: 1 },
                  instrumentId: '1',
                  name: 'CREDIT_CARD',
                  redirectUrl: 'http://redirect.com',
                  sessionId: undefined,
                },
                { name: 'WALLET' },
              ],
            },
          },
          purchaseId,
          callbackUrl: callBackUrl,
        },
      };
      const response = {
        threeDs: {
          acsUrl: 'acsUrl',
          paReq: 'paReq',
        },
      };
      const purchasePayment = {
        payments: [
          {
            paymentMethod: 'paymentMethod',
            paymentProcessors: [
              {
                name: 'CREDIT_CARD',
                amount: {
                  value: 1,
                  currency: 'HKD',
                },
              },
              {
                name: 'WALLET',
              },
            ],
          },
        ],
      };
      get.mockReturnValueOnce(purchasePayment.payments[0]);
      const generator = makePaymentSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);
      next = generator.next(purchasePayment);
      expect(next.value).toEqual(
        call(makePayment, purchaseId, {
          merchantOrderId,
          amount: {
            value: 1,
            currency: 'HKD',
          },
          payment: {
            paymentMethod: 'paymentMethod',
            paymentProcessors: [
              {
                redirectUrl: callBackUrl,
                instrumentId: '1',
                sessionId: undefined,
                amount: {
                  currency: 'HKD',
                  value: 1,
                },
                name: 'CREDIT_CARD',
              },
              {
                name: 'WALLET',
              },
            ],
          },
        }),
      );
      next = generator.next(response);
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });

    it('should check out successfully with three3ds required', () => {
      const payload = {
        data: {
          order: {
            redirectUrl: MAKE_PAYMENT_RESPONSE_URL,
            merchantOrderId,
            amount: {
              value: 1,
              currency: 'HKD',
            },

            payment: {
              paymentMethod: 'paymentMethod',
              paymentProcessors: [
                {
                  redirectUrl: callBackUrl,
                  instrumentId: '1',
                  sessionId: undefined,
                  amount: {
                    currency: 'HKD',
                    value: 1,
                  },
                  name: 'CREDIT_CARD',
                },
                {
                  name: 'WALLET',
                },
              ],
            },
          },
          purchaseId,
          callbackUrl: callBackUrl,
        },
      };
      const response = {
        status: 'REQUIRED_3DS',
        payment: {
          paymentProcessors: [],
        },
        threeDs: {
          acsUrl: 'acsUrl',
          paReq: 'paReq',
        },
      };
      const purchasePayment = {
        payments: [
          {
            paymentMethod: 'paymentMethod',
            paymentProcessors: [
              {
                name: 'CREDIT_CARD',
                amount: {
                  value: 1,
                  currency: 'HKD',
                },
              },
              {
                name: 'WALLET',
              },
            ],
          },
        ],
      };
      get.mockReturnValueOnce(purchasePayment.payments[0]);
      const generator = makePaymentSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);
      next = generator.next(purchasePayment);
      expect(next.value).toEqual(
        call(makePayment, purchaseId, {
          merchantOrderId,
          amount: {
            value: 1,
            currency: 'HKD',
          },
          payment: {
            paymentMethod: 'paymentMethod',
            paymentProcessors: [
              {
                redirectUrl: callBackUrl,
                instrumentId: '1',
                sessionId: undefined,
                amount: {
                  currency: 'HKD',
                  value: 1,
                },
                name: 'CREDIT_CARD',
              },
              {
                name: 'WALLET',
              },
            ],
          },
        }),
      );
      next = generator.next(response);
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });

    it('should handle the error case', () => {
      const payload = {
        data: {
          order: {
            redirectUrl: MAKE_PAYMENT_RESPONSE_URL,
            merchantOrderId,
            amount: {
              value: 1,
              currency: 'HKD',
            },

            payment: {
              paymentMethod: 'paymentMethod',
              paymentProcessors: [
                {
                  redirectUrl: callBackUrl,
                  instrumentId: '1',
                  sessionId: undefined,
                  amount: {
                    currency: 'HKD',
                    value: 1,
                  },
                  name: 'CREDIT_CARD',
                },
                {
                  name: 'WALLET',
                },
              ],
            },
          },
          purchaseId,
          callbackUrl: callBackUrl,
        },
      };
      const response = {
        error: true,
      };
      const purchasePayment = {
        payments: [
          {
            paymentMethod: 'paymentMethod',
            paymentProcessors: [
              {
                name: 'CREDIT_CARD',
                amount: {
                  value: 1,
                  currency: 'HKD',
                },
              },
              {
                name: 'WALLET',
              },
            ],
          },
        ],
      };
      get.mockReturnValueOnce(purchasePayment.payments[0]);
      const generator = makePaymentSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);
      next = generator.next(purchasePayment);
      expect(next.value).toEqual(
        call(makePayment, purchaseId, {
          merchantOrderId,
          amount: {
            value: 1,
            currency: 'HKD',
          },
          payment: {
            paymentMethod: 'paymentMethod',
            paymentProcessors: [
              {
                redirectUrl: callBackUrl,
                instrumentId: '1',
                sessionId: undefined,
                amount: {
                  currency: 'HKD',
                  value: 1,
                },
                name: 'CREDIT_CARD',
              },
              {
                name: 'WALLET',
              },
            ],
          },
        }),
      );
      next = generator.next(response);
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });
  });

  describe('validatePaymentSaga', () => {
    it('should validate the payment successfully', () => {
      const payload = {
        paRes,
        MD: `timestamp==${timestamp}&&merchantOrderId==${merchantOrderId}&&purchaseId==${purchaseId}&&digest==${digest}&&callbackUrl=callbackUrl`,
      };
      const response = {
        paRes: 'paRes',
      };
      const generator = validatePaymentSaga({ payload });

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);
      next = generator.next();
      expect(next.value).toEqual(
        call(validatePayment, purchaseId, {
          paRes,
          MD: `timestamp=${timestamp}&merchantOrderId=${merchantOrderId}&purchaseId=${purchaseId}&digest=${digest}`,
        }),
      );
      next = generator.next(response);
      expect(window.open).toHaveBeenCalledWith('callbackUrl', '_self');
      expect(next.value).toStrictEqual('STOP_LOADER');
      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });
  });
});
