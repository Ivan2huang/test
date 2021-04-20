import getPrivacyPolicy from '../api';
import { fetchData } from '../../../../helpers/fetch';

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  privacyPolicy: jest.fn(locale => `test/privacy-policy?locale=${locale}`),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('Get face aging categories', () => {
  it('should call privacy policy api', async () => {
    fetchData.mockReturnValue({ content: 'english content' });
    const data = await getPrivacyPolicy('zh-HK');

    expect(data).toStrictEqual('english content');
    expect(fetchData).toBeCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith(
      'GET',
      'test/privacy-policy?locale=zh-HK',
      undefined,
    );
  });

  it('should call privacy policy api when response is empty', async () => {
    fetchData.mockReturnValue(undefined);
    const data = await getPrivacyPolicy('zh-HK');

    expect(data).toStrictEqual(undefined);
    expect(fetchData).toBeCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith(
      'GET',
      'test/privacy-policy?locale=zh-HK',
      undefined,
    );
  });
});
