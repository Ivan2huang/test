import { fetchData } from '../../../../helpers/fetch';
import { resetPassword, validateResetPasswordRequest } from '../api';

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  resetPassword: clientId => `test/reset-password/${clientId}`,
  validateResetPasswordRequest: clientId =>
    `test/validate-reset-password/${clientId}`,
}));

describe('ResetPassword API', () => {
  it('should call reset password api', () => {
    const body = {
      email: 'dummy@test.com',
      password: 'dummypassword',
      token: '123',
      isFirstTimeUser: false,
    };

    resetPassword('clientA', body);

    expect(fetchData).toHaveBeenCalledWith(
      'post',
      'test/reset-password/clientA',
      body,
      { 'Content-Type': 'application/json' },
      true,
    );
  });

  it('should call validate reset password request api', () => {
    const body = {
      email: 'dummy@test.com',
      token: '123',
    };

    validateResetPasswordRequest('clientA', body);

    expect(fetchData).toHaveBeenCalledWith(
      'post',
      'test/validate-reset-password/clientA',
      body,
      { 'Content-Type': 'application/json' },
      true,
    );
  });
});
