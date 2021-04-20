import { fetchData } from '../../../../../helpers/fetch';
import URL from '../../../../../helpers/url';

// eslint-disable-next-line import/prefer-default-export
export const verifyToken = async (clientId, token) => {
  const response = await fetchData(
    'post',
    URL.verifyPersonalEmailToken(clientId),
    { token },
    true,
  );
  return response;
};
