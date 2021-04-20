import reducer from '../reducer';

describe('Error Reducer', () => {
  it('Should create the error object when errorKey and error state is passed', () => {
    const initialState = {};
    const action = {
      type: 'UPDATE_ERROR',
      payload: {
        id: 'error-1',
        errorState: true,
      },
    };
    const expected = {
      'error-1': {
        errorState: true,
      },
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});
