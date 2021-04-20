import { forgotPassword } from '../action';

describe('ForgotPassword Action', () => {
  it('should create action for forgot password', () => {
    const expected = {
      type: 'FORGOT_PASSWORD',
      payload: {
        email: 'test@gmail.com',
      },
    };

    const actual = forgotPassword('test@gmail.com');

    expect(actual).toEqual(expected);
  });
});
