import URL from '../../../../helpers/url';
import { fetchData } from '../../../../helpers/fetch';
import { getCookie } from '../../../../helpers/auth';
import { CLIENT_ID } from '../../../../constants/auth';

// eslint-disable-next-line import/prefer-default-export
export const updateDependentProfile = async (dependentId, dateOfBirth) =>
  fetchData(
    'put',
    URL.memberProfile,
    {
      dateOfBirth,
      memberId: dependentId,
      clientId: getCookie(CLIENT_ID),
    },
    true,
  );

// eslint-disable-next-line import/prefer-default-export
export const inviteDependent = async (dependentEmail, dependentId) =>
  fetchData(
    'post',
    URL.inviteDependent(dependentId),
    { emailId: dependentEmail },
    true,
  );
