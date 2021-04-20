import { fetchData } from '../../../../helpers/fetch';
import { validateActivation } from '../api';

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  validateActivationRequest: () => 'test/validate-activation',
}));

describe('validateActivation API', () => {
  it('should call validate activation api', async () => {
    const client = 1;
    const token = 'asc';

    await validateActivation(client, token);

    expect(fetchData).toHaveBeenCalledWith(
      'post',
      'test/validate-activation',
      { token },
      true,
    );
  });
});
