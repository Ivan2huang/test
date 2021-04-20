import getLifestyleHealthScoreHistory from '../api';
import { fetchData } from '../../../../helpers/fetch';

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  lifestyleHealthScoresHistory: 'test/lifestyleHealthScoresHistory',
}));

describe('Get lifestyle health score history api', () => {
  it('should call lifestyle health score history api', async () => {
    fetchData.mockImplementation(() => ({ error: 'Error' }));
    await getLifestyleHealthScoreHistory();
    expect(fetchData).toBeCalled();
    expect(fetchData).toHaveBeenCalledWith(
      'GET',
      'test/lifestyleHealthScoresHistory',
      undefined,
      true,
    );
  });

  it('should provide error when api fail', async () => {
    fetchData.mockImplementation(() => ({ error: 'Error' }));

    const response = await getLifestyleHealthScoreHistory();

    expect(response).toEqual({ error: 'Error' });
  });

  it('should provide the transformed data when for successful api response', async () => {
    fetchData.mockReturnValue([
      { score: 28.0, createdOn: '2019-10-21T02:03:11.391959' },
      { score: 28.0, createdOn: '2019-10-18T12:18:45.04069' },
      { score: 42.0, createdOn: '2019-10-18T12:15:15.816802' },
    ]);

    const response = await getLifestyleHealthScoreHistory();

    expect(response).toStrictEqual([
      { score: 42.0, createdOn: '2019-10-18T12:15:15.816802' },
      { score: 28.0, createdOn: '2019-10-18T12:18:45.04069' },
      { score: 28.0, createdOn: '2019-10-21T02:03:11.391959' },
    ]);
  });
});
