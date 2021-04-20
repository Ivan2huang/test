import { mapStateToProps } from '../AccountLockedContainer';

describe('AccountLockedContainer', () => {
  it('should pass the props to the component when there is error', () => {
    const state = {
      error: {
        accountLocked: {
          errorState: 'account locked',
        },
      },
    };
    const expected = {
      messsage: 'account locked',
    };

    const actual = mapStateToProps(state);

    expect(actual).toEqual(expected);
  });

  it('should pass the props to the component when there is no error', () => {
    const state = {
      error: {},
    };
    const expected = {
      messsage: undefined,
    };

    const actual = mapStateToProps(state);

    expect(actual).toEqual(expected);
  });
});
