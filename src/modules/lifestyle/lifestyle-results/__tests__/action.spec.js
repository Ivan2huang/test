import { getLifestyleResults, updateLifestyleResults } from '../action';

describe('Lifestyle results action', () => {
  it('should generate get lifestyle results action', () => {
    const expected = {
      type: 'GET_LIFESTYLE_RESULTS',
      payload: {},
    };

    const actual = getLifestyleResults();

    expect(actual).toEqual(expected);
  });

  it('should generate update lifestyle results action', () => {
    const expected = {
      type: 'UPDATE_LIFESTYLE_RESULTS',
      payload: {
        results: { bmiScore: 10 },
      },
    };

    const actual = updateLifestyleResults({ bmiScore: 10 });

    expect(actual).toEqual(expected);
  });
});
