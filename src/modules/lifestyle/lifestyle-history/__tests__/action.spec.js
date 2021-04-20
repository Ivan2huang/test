import {
  getLifestyleHealthScoresHistory,
  updateLifestyleHealthScoresHistory,
} from '../action';

describe('Lifestyle history action', () => {
  it('should generate get lifestyle health scores history action', () => {
    const expected = {
      type: 'GET_LIFESTYLE_HEALTH_SCORES_HISTORY',
      payload: {},
    };

    const actual = getLifestyleHealthScoresHistory();

    expect(actual).toEqual(expected);
  });

  it('should generate update lifestyle health scores history action', () => {
    const expected = {
      type: 'UPDATE_LIFESTYLE_HEALTH_SCORES_HISTORY',
      payload: {
        healthScoresHistory: [{ score: 47 }],
      },
    };

    const actual = updateLifestyleHealthScoresHistory([{ score: 47 }]);

    expect(actual).toEqual(expected);
  });
});
