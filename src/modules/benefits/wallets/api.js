import { fetchData } from '../../../helpers/fetch';
import URL from '../../../helpers/url';

export const getWallets = includeDependents => {
  return fetchData('get', URL.eWallets(includeDependents), null, true);
};

export const getCurrentPlanYear = () => {
  return fetchData('get', URL.currentPlanyear);
};
