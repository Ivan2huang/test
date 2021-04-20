import reducer, { initialState } from '../reducer';
import { STORE_USER_EMAIL, UPDATE_OTP_STATUS } from '../action';

describe('Account Activation reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle STORE_USER_EMAIL', () => {
    const email = 'test@email.com';
    const action = {
      type: STORE_USER_EMAIL,
      payload: { email },
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      email,
    });
  });

  it('should handle UPDATE_LOADING_STATUS', () => {
    const status = {
      key: 'value',
    };

    const action = {
      type: UPDATE_OTP_STATUS,
      payload: { status },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      otpStatus: status,
    });
  });
});
