import reducer from '../reducer';

describe('Lifestyle tips reducer', () => {
  it('should update the state when update lifestyle tips action is dispatched', () => {
    const initialState = {
      healthScoresHistory: [],
    };

    const expected = {
      healthScoresHistory: [{ score: 43 }],
    };

    const action = {
      type: 'UPDATE_LIFESTYLE_HEALTH_SCORES_HISTORY',
      payload: { healthScoresHistory: [{ score: 43 }] },
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});
