import {
  getRecommendations,
  updateRecommendations,
  getSuggestionRecommendations,
  updateSuggestionRecommendations,
} from '../action';

describe('Recommendation Action', () => {
  it('should generate get recommendation action', () => {
    const expected = {
      type: 'GET_RECOMMENDATIONS',
      payload: {
        tipCategory: 'bmi',
      },
    };

    const actual = getRecommendations('bmi');

    expect(actual).toEqual(expected);
  });

  it('should generate update recommendation action', () => {
    const expected = {
      type: 'UPDATE_RECOMMENDATIONS',
      payload: {
        recommendations: [{ title: 'test 1' }],
      },
    };

    const actual = updateRecommendations([{ title: 'test 1' }]);

    expect(actual).toEqual(expected);
  });

  it('should generate get suggestion action', () => {
    const expected = {
      type: 'GET_SUGGESTION_RECOMMENDATIONS',
      payload: {},
    };

    const actual = getSuggestionRecommendations();

    expect(actual).toEqual(expected);
  });

  it('should generate update suggestion action', () => {
    const expected = {
      type: 'UPDATE_SUGGESTION_RECOMMENDATIONS',
      payload: {
        recommendations: [{ title: 'test 1' }],
      },
    };

    const actual = updateSuggestionRecommendations([{ title: 'test 1' }]);

    expect(actual).toEqual(expected);
  });
});
