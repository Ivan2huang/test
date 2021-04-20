import { fetchData } from '../../helpers/fetch';
import URL from '../../helpers/url';

const getLifeStyleDetails = async () => {
  const response = await fetchData('get', URL.getLifestyleDetails);
  return response && Object.keys(response).length ? response : null;
};

export default getLifeStyleDetails;
