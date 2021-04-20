import { fetchData } from '../../../helpers/fetch';
import URL from '../../../helpers/url';

const getLifestyleScore = () => {
  return fetchData('GET', URL.lifestyleHealthScore, undefined, true);
};

export default getLifestyleScore;
