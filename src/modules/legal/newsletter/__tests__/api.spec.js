import { getNewsLetterCondition } from '../api';
import { fetchData } from '../../../../helpers/fetch';

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  newsLetter: jest.fn(
    locale => `test/wellness-newsletter-agreement?locale=${locale}`,
  ),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('Get news letter content', () => {
  it('should call get news letter api', async () => {
    fetchData.mockReturnValue({ content: 'english content' });
    const data = await getNewsLetterCondition('en-HK');

    expect(data).toStrictEqual('english content');
    expect(fetchData).toBeCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith(
      'GET',
      'test/wellness-newsletter-agreement?locale=en-HK',
      undefined,
      true,
    );
  });

  it('should call get news letter api when response is error', async () => {
    fetchData.mockReturnValue({
      error: true,
    });
    const data = await getNewsLetterCondition('zh-HK');

    expect(data).toStrictEqual('');
    expect(fetchData).toBeCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith(
      'GET',
      'test/wellness-newsletter-agreement?locale=zh-HK',
      undefined,
      true,
    );
  });
});
