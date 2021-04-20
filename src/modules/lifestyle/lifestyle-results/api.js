import { fetchData } from '../../../helpers/fetch';
import URL from '../../../helpers/url';

const getLifestyleResults = () => {
  return fetchData('GET', URL.lifestyleResults, undefined, true);
};

export default getLifestyleResults;
