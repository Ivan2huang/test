import { fetchData } from '../../../helpers/fetch';
import URL from '../../../helpers/url';

const getCompanyContactDetailsAndFAQs = locale => {
  return fetchData('GET', URL.companyContactDetailsAndFAQs(locale));
};

export default getCompanyContactDetailsAndFAQs;
