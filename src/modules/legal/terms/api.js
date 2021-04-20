import { fetchData } from '../../../helpers/fetch';
import URL from '../../../helpers/url';
import { getCookie } from '../../../helpers/auth';
import { USER_ID, CLIENT_ID } from '../../../constants/auth';

export const getTermsConditions = async locale => {
  const data = await fetchData('GET', URL.termsConditions(locale), undefined);

  return data && data.content.replace(/\n/g, '<br />');
};

export const updateTermsAccepted = alreadyAcceptedEdm => {
  const body = {
    isTermsAccepted: true,
    clientId: getCookie(CLIENT_ID),
    memberId: getCookie(USER_ID),
    isEdmOptedOut: alreadyAcceptedEdm,
  };
  return fetchData('PUT', URL.memberProfile, body, true);
};
