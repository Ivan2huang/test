import { fetchData } from '../../../helpers/fetch';
import URL from '../../../helpers/url';

const getPrivacyPolicy = async locale => {
  const data = await fetchData('GET', URL.privacyPolicy(locale), undefined);

  return data && data.content.replace(/\n/g, '<br />').replace(/\t/g, '&emsp;');
};

export default getPrivacyPolicy;
