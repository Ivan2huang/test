import { fetchData } from '../../../helpers/fetch';
import URL from '../../../helpers/url';

const transformClinics = response => {
  return response.map(clinic => {
    // eslint-disable-next-line no-param-reassign
    clinic.consultationType = clinic.consultationType || clinic.specialty;
    return clinic;
  });
};

const getClinics = async () => {
  const response = await fetchData('get', URL.clinics);
  if (!response) return response;
  return transformClinics(response);
};

export default getClinics;
