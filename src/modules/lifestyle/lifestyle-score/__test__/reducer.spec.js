import reducer from '../reducer';

describe('Lifestyle score reducerf', () => {
  it('should provide updated state for updateLifestyleScore action', () => {
    const initialState = {
      healthScore: undefined,
    };
    const expectedState = {
      healthScore: 10,
    };
    const action = {
      type: 'UPDATE_LIFESTYLE_SCORE',
      payload: { healthScore: 10 },
    };

    const actual = reducer(initialState, action);

    expect(actual).toStrictEqual(expectedState);
  });
});
