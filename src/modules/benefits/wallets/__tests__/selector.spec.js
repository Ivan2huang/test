import { walletsSelector, roleSelector } from '../selector';

describe('Wallets Selector', () => {
  it('should return default wallets object', () => {
    const meState = {
      me: {
        member: {},
      },
      benefits: {
        wallets: {
          wallets: {},
          planYear: {},
        },
      },
    };
    const expected = {
      expiryDate: undefined,
      wallets: [],
    };

    const actual = walletsSelector(meState);

    expect(actual).toEqual(expected);
  });

  it('should return wallets with memberId fullname map', () => {
    const meState = {
      me: {
        member: {
          profile: {
            memberId: 1,
            firstName: 'firstName',
            lastName: 'lastName',
            dependants: [
              {
                memberId: 2,
                firstName: 'firstName 2',
                lastName: 'lastName 2',
              },
              {
                memberId: 3,
                firstName: 'firstName 3',
                lastName: 'lastName 3',
              },
            ],
          },
        },
      },
      benefits: {
        wallets: {
          planYear: { endDate: '2020-04-31T00:00:00Z' },
          wallets: {
            member: {
              memberId: 1,
            },
            dependents: [
              {
                memberId: 2,
              },
              {
                memberId: 3,
              },
            ],
          },
        },
      },
    };
    const expected = {
      expiryDate: new Date('2020-04-31T00:00:00Z'),
      wallets: [
        {
          memberId: 1,
          firstName: 'firstName',
          lastName: 'lastName',
        },
        {
          memberId: 2,
          firstName: 'firstName 2',
          lastName: 'lastName 2',
        },
        {
          memberId: 3,
          firstName: 'firstName 3',
          lastName: 'lastName 3',
        },
      ],
    };

    const actual = walletsSelector(meState);
    expect(actual).toEqual(expected);
  });

  it('should return role value', () => {
    const meState = {
      me: {
        member: {
          profile: {
            role: 'test',
          },
        },
      },
    };
    const expected = 'test';

    const actual = roleSelector(meState);

    expect(actual).toEqual(expected);
  });

  it('should return default role value', () => {
    const meState = {
      me: {
        member: {},
      },
    };
    const expected = undefined;

    const actual = roleSelector(meState);

    expect(actual).toEqual(expected);
  });
});
