import { membersSelector } from '../selector';

describe('Members Selector', () => {
  it('should provide formatted members object', () => {
    const meState = {
      member: {
        profile: {
          memberId: 1,
          fullName: 'test name',
          dependants: [
            {
              memberId: 2,
              fullName: 'test name 2',
            },
            {
              memberId: 3,
              fullName: 'test name 3',
            },
          ],
        },
      },
    };
    const expected = {
      1: 'test name',
      2: 'test name 2',
      3: 'test name 3',
    };

    const actual = membersSelector(meState);

    expect(actual).toEqual(expected);
  });
  it('should return empty memberId  name map', () => {
    const meState = {
      member: {
        profile: {
          memberId: '',
          fullName: '',
          dependants: [],
        },
      },
    };
    const expected = {};

    const actual = membersSelector(meState);

    expect(actual).toEqual(expected);
  });
});
