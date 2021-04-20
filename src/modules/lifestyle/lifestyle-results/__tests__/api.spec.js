import getLifestyleResults from '../api';
import { fetchData } from '../../../../helpers/fetch';

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  lifestyleResults: 'test/lifestyleResults',
}));

describe('Get lifestyle results api', () => {
  it('should call lifestyle results api', async () => {
    await getLifestyleResults();
    expect(fetchData).toBeCalled();
    expect(fetchData).toHaveBeenCalledWith(
      'GET',
      'test/lifestyleResults',
      undefined,
      true,
    );
  });

  it('should provide error when api fail', async () => {
    fetchData.mockImplementation(() => ({ error: 'Error' }));

    const response = await getLifestyleResults();

    expect(response).toEqual({ error: 'Error' });
  });

  it('should provide data when api succeed', async () => {
    fetchData.mockImplementation(() => ({ data: 'data' }));

    const response = await getLifestyleResults();

    expect(response).toEqual({ data: 'data' });
  });
});
