import reducer from '../reducer';

describe('Lifestyle tips reducer', () => {
  it('should update the state when update lifestyle tips action is dispatched', () => {
    const initialState = {
      details: {},
    };

    const expected = {
      details: { content: ['Drink water'] },
    };

    const action = {
      type: 'UPDATE_LIFESTYLE_TIPS',
      payload: { tips: { content: ['Drink water'] } },
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});
