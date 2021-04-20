import reducer from '../reducer';

describe('Lifestyle results reducer', () => {
  it('should update the state when update lifestyle results action is dispatched', () => {
    const initialState = {
      details: {},
    };

    const expected = {
      details: { bmiScore: 15 },
    };

    const action = {
      type: 'UPDATE_LIFESTYLE_RESULTS',
      payload: { results: { bmiScore: 15 } },
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});
