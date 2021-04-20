import { fetchData } from '../../../helpers/fetch';
import URL from '../../../helpers/url';
import { getCookie } from '../../../helpers/auth';
import { USER_ID, CLIENT_ID } from '../../../constants/auth';

const updateLanguagePreference = language => {
  const body = {
    preferredLocale: language,
    clientId: getCookie(CLIENT_ID),
    memberId: getCookie(USER_ID),
  };
  return fetchData('PUT', URL.updateSettings, body, true);
};

export const updateSettings = settings => {
  const body = {
    clientId: getCookie(CLIENT_ID),
    memberId: getCookie(USER_ID),
    ...settings,
  };
  return fetchData('PUT', URL.updateSettings, body, true);
};

export const updateCookieLanguage = async code => {
  const url = URL.updateCookieLanguage(code);
  const response = await fetchData('GET', url);
  return response;
};

export const resetPassword = () => {
  const userId = getCookie(USER_ID);
  return fetchData('POST', URL.requestResetPassword(userId), {});
};

export default updateLanguagePreference;
