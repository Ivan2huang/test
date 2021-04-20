import reducer, { initialState } from '../reducer';
import { UPDATE_VALIDATION_STATUS } from '../action';

describe('Activation reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle UPDATE_VALIDATION_STATUS', () => {
    const status = 'SUCCESS';
    const action = {
      type: UPDATE_VALIDATION_STATUS,
      payload: {
        status,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      verificationStatus: status,
    });
  });
});
