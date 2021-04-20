import { fetchData } from '../../../helpers/fetch';
import URL from '../../../helpers/url';

// eslint-disable-next-line import/prefer-default-export
export const getNewsLetterCondition = async locale => {
  const data = await fetchData('GET', URL.newsLetter(locale), undefined, true);
  if (!data.error) {
    return data && data.content.replace(/\n/g, '<br />');
  }
  return '';
};
