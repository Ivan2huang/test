import { fetchData } from '../../../helpers/fetch';
import URL from '../../../helpers/url';

const getLifestyleTips = () => {
  return fetchData('GET', URL.lifestyleTips, undefined, true);
};

export const getLifestyleTipFromCMS = type => {
  return fetchData('GET', URL.lifestyleTipFromCMS(type), undefined, true);
};

export default getLifestyleTips;
