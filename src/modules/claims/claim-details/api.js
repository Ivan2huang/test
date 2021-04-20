import URL from '../../../helpers/url';
import { fetchData } from '../../../helpers/fetch';
import { transformClaimDetails } from './utils';

const getClaimDetails = async id => {
  const response = await fetchData('get', URL.claimDetails(id));
  return response && transformClaimDetails(response);
};

export default getClaimDetails;
