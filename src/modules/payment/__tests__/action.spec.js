import {
  getInstrument,
  updateInstrument,
  validateInstrument,
  submitPreAuth,
  updatePaymentPreAuth,
  checkOutOrder,
  validateOrder,
} from '../action';

import {
  GET_INSTRUMENTS,
  UPDATE_INSTRUMENTS,
  VALIDATE_INSTRUMENT,
  SUBMIT_PRE_AUTH,
  UPDATE_PAYMENT_PRE_AUTH,
  CHECK_OUT_ORDER,
  VALIDATE_ORDER,
} from '../actionTypes';

describe('Payment Action', () => {
  const paRes = 'paaaa';
  const query = {};
  const data = {};
  const userId = 3;
  const clientId = 'ocbc2';
  const callBackUrl = 'http://redirect.com';
  const jwt = 'ec0242894';
  const MD = 'm&d';

  it('should create get instrument action', () => {
    const expected = {
      type: GET_INSTRUMENTS,
      payload: { query, jwt },
    };

    const actual = getInstrument(query, jwt);

    expect(actual).toEqual(expected);
  });

  it('should create update instrument action', () => {
    const expected = {
      type: UPDATE_INSTRUMENTS,
      payload: {
        instruments: [],
      },
    };

    const actual = updateInstrument([]);

    expect(actual).toEqual(expected);
  });

  it('should create validate instrument action', () => {
    const expected = {
      type: VALIDATE_INSTRUMENT,
      payload: {
        paRes,
        MD,
      },
    };

    const actual = validateInstrument(paRes, MD);

    expect(actual).toEqual(expected);
  });

  it('should create submit pre-auth action', () => {
    const expected = {
      type: SUBMIT_PRE_AUTH,
      payload: {
        data,
        userId,
        clientId,
        callBackUrl,
        jwt,
      },
    };

    const actual = submitPreAuth(data, userId, clientId, callBackUrl, jwt);

    expect(actual).toEqual(expected);
  });

  it('should create update payment pre-auth action', () => {
    const expected = {
      type: UPDATE_PAYMENT_PRE_AUTH,
      payload: {
        paReq: 'paReq',
      },
    };

    const actual = updatePaymentPreAuth('paReq');

    expect(actual).toEqual(expected);
  });

  it('should create checkOutOrder action', () => {
    const expected = {
      type: CHECK_OUT_ORDER,
      payload: {
        order: {
          merchantOrderId: 1,
        },
        userId,
        clientId,
        callBackUrl,
        jwt,
      },
    };

    const actual = checkOutOrder(
      { merchantOrderId: 1 },
      userId,
      clientId,
      callBackUrl,
      jwt,
    );

    expect(actual).toEqual(expected);
  });

  it('should create validateOrder action', () => {
    const expected = {
      type: VALIDATE_ORDER,
      payload: {
        paRes,
        MD,
      },
    };

    const actual = validateOrder(paRes, MD);

    expect(actual).toEqual(expected);
  });
});
