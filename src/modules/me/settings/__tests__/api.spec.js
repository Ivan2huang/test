import updateLanguagePreference, {
  updateSettings,
  updateCookieLanguage,
  resetPassword,
} from '../api';
import { fetchData } from '../../../../helpers/fetch';

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  updateSettings: '/users/profile',
  updateCookieLanguage: () => '/languages/en-HK',
  requestResetPassword: userId => `/request-reset-password/${userId}`,
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

jest.mock('../../../../constants/config', () => ({
  clientId: 'testClientId',
}));

describe('Settings Api', () => {
  beforeEach(() => {
    fetchData.mockClear();
  });

  it('should call fetch data with auth with PUT', () => {
    const expectedBody = {
      preferredLocale: 'en-HK',
      clientId: 'testClientId',
      memberId: 'USER_ID',
    };
    updateLanguagePreference('en-HK');

    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith(
      'PUT',
      '/users/profile',
      expectedBody,
      true,
    );
  });

  it('should call request reset password', () => {
    resetPassword();

    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith(
      'POST',
      '/request-reset-password/USER_ID',
      {},
    );
  });

  it('should call fetch data with correct data', () => {
    const expectedBody = {
      isEdmOptedOut: false,
      clientId: 'testClientId',
      memberId: 'USER_ID',
    };
    updateSettings({ isEdmOptedOut: false });

    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith(
      'PUT',
      '/users/profile',
      expectedBody,
      true,
    );
  });

  it('should call update language', () => {
    updateCookieLanguage('en-HK');

    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith('GET', '/languages/en-HK');
  });
});
