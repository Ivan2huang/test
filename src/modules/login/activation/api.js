/* eslint-disable import/prefer-default-export */

import { fetchData } from '../../../helpers/fetch';
import URL from '../../../helpers/url';

export const validateActivation = async (clientid, token) => {
  const response = await fetchData(
    'post',
    URL.validateActivationRequest(clientid),
    { token },
    true,
  );

  return response;
};
