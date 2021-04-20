import reducer from '../reducer';

describe('Settings reducer', () => {
  it('should update the store when update reset password result action has been dispatched', () => {
    const initialState = {
      isRequestResetPasswordSuccess: false,
    };

    const action = {
      type: 'UPDATE_RESET_PASSWORD_RESULT',
      payload: {
        result: true,
      },
    };

    const expected = {
      isRequestResetPasswordSuccess: true,
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});
