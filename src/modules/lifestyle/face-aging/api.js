import { fetchData } from '../../../helpers/fetch';
import URL from '../../../helpers/url';

const getFaceAgingCategories = () => {
  return fetchData('GET', URL.faceAgingCategories, undefined, true);
};

export const deleteFaceAgingImage = () => {
  return fetchData('DELETE', URL.lifestyleFaceImage, undefined, true);
};

export default getFaceAgingCategories;
