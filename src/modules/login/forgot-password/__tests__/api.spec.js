import { forgotPassword } from '../api';

import { fetchData } from '../../../../helpers/fetch';

jest.mock('../../../../helpers/fetch', () => ({ fetchData: jest.fn() }));

jest.mock('../../../../helpers/url', () => ({
  forgotPassword: `testurl`,
}));

describe('ForgotPassword Api', () => {
  it('should call forgot password api', () => {
    forgotPassword('dummy@test.com');

    expect(fetchData).toHaveBeenCalledWith(
      'post',
      'testurl',
      { emailId: 'dummy@test.com' },
      { 'Content-Type': 'application/json' },
      true,
    );
  });
});
