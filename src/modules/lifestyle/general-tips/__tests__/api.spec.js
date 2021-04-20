import getLifestyleTips from '../api';
import { fetchData } from '../../../../helpers/fetch';

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  lifestyleTips: 'test/lifestyletips',
}));

describe('Get lifestyle tips api', () => {
  it('should call lifestyle tips api', async () => {
    await getLifestyleTips();
    expect(fetchData).toHaveBeenCalledWith(
      'GET',
      'test/lifestyletips',
      undefined,
      true,
    );
  });

  it('should provide error when api fail', async () => {
    fetchData.mockImplementation(() => ({ error: 'Error' }));

    const response = await getLifestyleTips();

    expect(response).toEqual({ error: 'Error' });
  });

  it('should provide data when api succeed', async () => {
    fetchData.mockImplementation(() => ({ data: 'data' }));

    const response = await getLifestyleTips();

    expect(response).toEqual({ data: 'data' });
  });
});
