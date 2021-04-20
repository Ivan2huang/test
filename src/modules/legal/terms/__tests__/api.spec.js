import { getTermsConditions, updateTermsAccepted } from '../api';
import { fetchData } from '../../../../helpers/fetch';

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  termsConditions: jest.fn(locale => `test/terms-conditions?locale=${locale}`),
  memberProfile: '/users/profile',
}));

jest.mock('../../../../helpers/auth', () => ({
  getCookie: jest.fn(key => {
    const keys = {
      user_id: 'USER_ID',
      client_id: 'testClientId',
    };

    return keys[key];
  }),
}));

export const USER_ID = 'user_id';
export const CLIENT_ID = 'client_id';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Get terms and conditions', () => {
  it('should call terms and conditions api', async () => {
    fetchData.mockReturnValue({ content: 'english content' });
    const data = await getTermsConditions('zh-HK');

    expect(data).toStrictEqual('english content');
    expect(fetchData).toBeCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith(
      'GET',
      'test/terms-conditions?locale=zh-HK',
      undefined,
    );
  });

  it('should call terms and conditions api when response is empty', async () => {
    fetchData.mockReturnValue(undefined);
    const data = await getTermsConditions('zh-HK');

    expect(data).toStrictEqual(undefined);
    expect(fetchData).toBeCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith(
      'GET',
      'test/terms-conditions?locale=zh-HK',
      undefined,
    );
  });

  it('should call update member profile with auth with PUT', () => {
    const expectedBody = {
      isTermsAccepted: true,
      clientId: 'testClientId',
      memberId: 'USER_ID',
    };
    updateTermsAccepted();

    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith(
      'PUT',
      '/users/profile',
      expectedBody,
      true,
    );
  });
});
