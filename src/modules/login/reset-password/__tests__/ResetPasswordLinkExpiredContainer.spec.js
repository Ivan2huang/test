import {
  mapStateToProps,
  mapDispatchToProps,
} from '../ResetPasswordLinkExpiredContainer';

jest.mock('../../forgot-password/action', () => ({
  forgotPassword: jest.fn(email => ({
    type: 'FORGOT_PASSWORD',
    payload: {
      email,
    },
  })),
}));

describe('ResetPasswordLinkExpiredContainer', () => {
  it('should pass the props to the component', () => {
    const state = {};
    const expected = {};

    const actual = mapStateToProps(state);

    expect(actual).toEqual(expected);
  });

  it('should dispatch the forgot password action', () => {
    const dispatch = jest.fn();

    const dispatchToProps = mapDispatchToProps(dispatch);
    const expected = {
      type: 'FORGOT_PASSWORD',
      payload: {
        email: 'test@test.com',
      },
    };
    dispatchToProps.forgotPassword('test@test.com');

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
