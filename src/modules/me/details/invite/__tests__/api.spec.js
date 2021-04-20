import { inviteDependent, updateDependentProfile } from '../api';
import { fetchData } from '../../../../../helpers/fetch';
import CONFIG from '../../../../../constants/config';

jest.mock('../../../../../helpers/auth', () => ({
  getCookie: jest.fn(() => 'testClientId'),
}));

jest.mock('../../../../../helpers/auth', () => ({
  getCookie: jest.fn(() => 'testClientId'),
}));

jest.mock('../../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../../helpers/url', () => ({
  inviteDependent: id => `test/api/${id}/invitation`,
  memberProfile: 'test/api/member/profile',
}));

it('should send update dependent profile successfully', async () => {
  const updateResponse = {};
  const dependentId = 1;
  const dateOfBirth = new Date(2010, 1, 1);

  fetchData.mockReturnValue(updateResponse);

  const actual = await updateDependentProfile(dependentId, dateOfBirth);

  expect(actual).toEqual(updateResponse);
  expect(fetchData).toHaveBeenCalledWith(
    'put',
    'test/api/member/profile',
    {
      dateOfBirth,
      memberId: dependentId,
      clientId: CONFIG.clientId,
    },
    true,
  );
});

it('should return error when update dependent api fails', async () => {
  const updateResponse = { error: 'api call failure' };
  const dependentId = 1;
  const dateOfBirth = new Date(2010, 1, 1);

  fetchData.mockReturnValue(updateResponse);

  const actual = await updateDependentProfile(dependentId, dateOfBirth);

  expect(actual).toEqual(updateResponse);
  expect(fetchData).toHaveBeenCalledWith(
    'put',
    'test/api/member/profile',
    {
      dateOfBirth,
      memberId: dependentId,
      clientId: CONFIG.clientId,
    },
    true,
  );
});

it('should send invite successfully with valid access token', async () => {
  const inviteDependentResponse = {};
  const dependentEmail = 'dependent@email.com';

  const dependentData = {
    emailId: 'dependent@email.com',
  };

  fetchData.mockReturnValue(inviteDependentResponse);

  const actual = await inviteDependent(dependentEmail, '12');

  expect(actual).toEqual(inviteDependentResponse);
  expect(fetchData).toHaveBeenCalledWith(
    'post',
    'test/api/12/invitation',
    dependentData,
    true,
  );
});

it('should return error when invite dependent api fails', async () => {
  const inviteDependentResponse = { error: 'api call failure' };
  const dependentEmail = 'dependent@email.com';

  const dependentData = {
    emailId: 'dependent@email.com',
  };
  const expected = { error: 'api call failure' };

  fetchData.mockReturnValue(inviteDependentResponse);

  const actual = await inviteDependent(dependentEmail, '12');

  expect(actual).toEqual(expected);
  expect(fetchData).toHaveBeenCalledWith(
    'post',
    'test/api/12/invitation',
    dependentData,
    true,
  );
});
