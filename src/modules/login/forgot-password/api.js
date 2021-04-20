/* eslint-disable import/prefer-default-export */

import { fetchData } from '../../../helpers/fetch';
import URL from '../../../helpers/url';

export const forgotPassword = (emailId, verify) => {
  return fetchData(
    'post',
    URL.forgotPassword,
    { emailId, verify },
    { 'Content-Type': 'application/json' },
    true,
  );
};
