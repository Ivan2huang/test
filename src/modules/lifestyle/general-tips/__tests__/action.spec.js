import { getLifestyleTips, updateLifestyleTips } from '../action';

describe('Lifestyle tips action', () => {
  it('should generate get lifestyle tips action', () => {
    const expected = {
      type: 'GET_LIFESTYLE_TIPS',
      payload: {},
    };

    const actual = getLifestyleTips();

    expect(actual).toEqual(expected);
  });

  it('should generate update lifestyle tips action', () => {
    const expected = {
      type: 'UPDATE_LIFESTYLE_TIPS',
      payload: {
        tips: [{ content: 'Drink water' }],
      },
    };

    const actual = updateLifestyleTips([{ content: 'Drink water' }]);

    expect(actual).toEqual(expected);
  });
});
