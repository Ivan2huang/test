import { getLifestyleScore, updateLifestyleScore } from '../action';

describe('Lifestyle Score action', () => {
  it('should create get lifestyle score action', () => {
    const expected = {
      type: 'GET_LIFESTYLE_SCORE',
      payload: {},
    };

    const actual = getLifestyleScore();

    expect(actual).toStrictEqual(expected);
  });

  it('should create update lifestyle score action', () => {
    const expected = {
      type: 'UPDATE_LIFESTYLE_SCORE',
      payload: {
        healthScore: 15,
      },
    };

    const actual = updateLifestyleScore(15);

    expect(actual).toStrictEqual(expected);
  });
});
