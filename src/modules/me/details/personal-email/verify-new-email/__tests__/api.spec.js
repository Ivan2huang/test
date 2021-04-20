import { fetchData } from '../../../../../../helpers/fetch';
import { verifyToken } from '../api';

jest.mock('../../../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../../../helpers/url', () => ({
  verifyPersonalEmailToken: () => '/test-verify-email',
}));

describe('verify new email api', () => {
  it('should call fetchData to verify new email', async () => {
    const clientId = 'clientId';
    const token = 'token';
    await verifyToken(clientId, token);

    expect(fetchData).toHaveBeenCalledWith(
      'post',
      '/test-verify-email',
      { token },
      true,
    );
  });
});
