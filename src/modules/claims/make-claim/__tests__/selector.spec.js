import { makeClaimSelector } from '../selector';

describe('MakeClaim Selector', () => {
  it('should get make claim state', () => {
    const state = {
      claim: {
        makeClaim: {
          types: {},
          categories: {},
          reasons: {},
        },
      },
    };
    const expected = {
      types: {},
      categories: {},
      reasons: {},
    };

    const actual = makeClaimSelector(state);

    expect(actual).toEqual(expected);
  });
});
