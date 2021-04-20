import { resetPassword, validateResetPasswordRequest } from '../action';

describe('ResetPassword Action', () => {
  it('should create action for reset password', () => {
    const expected = {
      type: 'RESET_PASSWORD',
      payload: {
        email: 'dummy@test.com',
        password: 'test@123',
        dateOfBirth: 'dateOfBirth',
        token: '123',
        isFirstTimeUser: false,
      },
    };

    const actual = resetPassword(
      'dummy@test.com',
      'test@123',
      'dateOfBirth',
      '123',
      false,
    );

    expect(actual).toEqual(expected);
  });

  it('should create action for validating reset password request', () => {
    const expected = {
      type: 'VALIDATE_RESET_PASSWORD_REQUEST',
      payload: {
        dateOfBirth: null,
        email: 'dummy@test.com',
        isVerifyingDoB: undefined,
        token: '123',
      },
    };

    const actual = validateResetPasswordRequest('dummy@test.com', null, '123');

    expect(actual).toEqual(expected);
  });
});
