import { getLifestyleDetails, updateLifestyleDetails } from '../action';

describe('Lifestyle Actions', () => {
  it('should create get lifestyle details action', () => {
    const expected = {
      type: 'GET_LIFESTYLE_DETAILS',
      payload: {},
    };

    const actual = getLifestyleDetails();

    expect(actual).toEqual(expected);
  });

  it('should create update lifestyle details action', () => {
    const lifestyleDetails = { height: 160, weight: 40 };
    const expected = {
      type: 'UPDATE_LIFESTYLE_DETAILS',
      payload: { lifestyleDetails: { height: 160, weight: 40 } },
    };

    const actual = updateLifestyleDetails(lifestyleDetails);

    expect(actual).toEqual(expected);
  });
});
