import getLifeStyleScore from '../api';
import { fetchData } from '../../../../helpers/fetch';

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  lifestyleHealthScore: '/test/lifestyleScore',
}));

describe('Get lifestyle score api', () => {
  it('should call lifestyle score api', () => {
    const expected = {
      score: 36.0,
      requestId: null,
    };
    fetchData.mockReturnValue(expected);

    const actual = getLifeStyleScore();

    expect(actual).toStrictEqual(expected);
    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith(
      'GET',
      '/test/lifestyleScore',
      undefined,
      true,
    );
  });
});
