/* eslint-disable import/prefer-default-export */
import { fetchData } from '../../helpers/fetch';
import URL from '../../helpers/url';

export const getContactInfo = locale => {
  return fetchData('get', URL.contactUsInfo(locale));
};
