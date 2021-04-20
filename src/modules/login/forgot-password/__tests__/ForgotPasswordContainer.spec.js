import {
  mapDispatchToProps,
  mapStateToProps,
} from '../ForgotPasswordContainer';

jest.mock('../action', () => ({
  forgotPassword: jest.fn(email => ({
    type: 'FORGOT_PASSWORD',
    payload: {
      email,
    },
  })),
}));

describe('ForgotPasswordContainer', () => {
  it('should pass the props to the component', () => {
    const state = {};
    const expected = {};

    const actual = mapStateToProps(state);

    expect(actual).toEqual(expected);
  });

  it('should dispatch the get forgot password action', () => {
    const dispatch = jest.fn();

    const dispatchToProps = mapDispatchToProps(dispatch);
    const expected = {
      type: 'FORGOT_PASSWORD',
      payload: {
        email: 'dummy@test.com',
      },
    };
    dispatchToProps.forgotPassword('dummy@test.com');

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
