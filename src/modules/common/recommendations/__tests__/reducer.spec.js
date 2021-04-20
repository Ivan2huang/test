import reducer from '../reducer';

describe('Recommendations Reducer', () => {
  it('should update recommendations', () => {
    const initialState = {
      details: [],
    };

    const expected = {
      details: { content: ['Drink water'] },
    };

    const action = {
      type: 'UPDATE_RECOMMENDATIONS',
      payload: { recommendations: { content: ['Drink water'] } },
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should update suggestions', () => {
    const initialState = {
      suggestions: [],
    };

    const expected = {
      suggestions: { content: ['Drink water'] },
    };

    const action = {
      type: 'UPDATE_SUGGESTION_RECOMMENDATIONS',
      payload: { recommendations: { content: ['Drink water'] } },
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});
