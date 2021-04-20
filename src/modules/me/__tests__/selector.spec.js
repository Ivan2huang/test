import { hasEHealthCardStatusSelector } from '../selector';

describe('Members Selector', () => {
  it('should provide formatted members object', () => {
    const benefitState = {
      benefits: {
        benefitStatus: {
          hasEHealthCard: true,
        },
      },
    };
    const actual = hasEHealthCardStatusSelector(benefitState);
    expect(actual).toEqual(true);
  });
});
