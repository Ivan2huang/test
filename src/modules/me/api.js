import { fetchData } from '../../helpers/fetch';
import URL from '../../helpers/url';
import { MOBILE_NUMBER_TYPE } from './constant';

const SELF = 'Self';
const EMPLOYEE = 'Employee';

const getRelationship = relationshipCategory =>
  relationshipCategory === SELF ? EMPLOYEE : relationshipCategory;

const getDependent = relationship => {
  const { relationshipCategory } = relationship;

  return {
    ...relationship,
    relationship: getRelationship(relationshipCategory),
  };
};

export const transformMemberDetails = response => {
  const { relationships = [], relationshipCategory } = response;

  return {
    ...response,
    relationship: getRelationship(relationshipCategory),
    dependants: relationships.map(getDependent),
  };
};

export const getMemberProfile = async () => {
  const response = await fetchData('get', URL.memberProfile);
  return response && transformMemberDetails(response);
};

export const getEmployeeProfile = employeeMemberId => {
  return fetchData('get', URL.employeeProfile(employeeMemberId));
};

export const getMemberBenefits = () => {
  return fetchData('get', URL.memberBenefits);
};

export const getHealthCards = () => {
  return fetchData('get', URL.healthCards);
};

export const getPolicyDetails = () => {
  return fetchData('get', URL.policyDetails);
};

export const getWallets = includeDependents => {
  return fetchData('get', URL.eWallets(includeDependents), null, true);
};

export const getCurrentPlanYear = () => {
  return fetchData('get', URL.currentPlanyear);
};

export const changePersonalEmail = async (oldEmail, newEmail) =>
  fetchData('post', URL.changePersonalEmail, { oldEmail, newEmail }, true);

export const requestPersonalEmailStatus = async () =>
  fetchData('get', URL.requestPersonalEmailStatus, null, true);

export const changeMobileNumber = async value =>
  fetchData(
    'post',
    URL.changeMeInfos,
    {
      type: MOBILE_NUMBER_TYPE,
      value,
    },
    true,
  );

export const requestMobileNumberStatus = async () =>
  fetchData('get', URL.changeMeInfos, null, true);

export const verifyOTP = async token =>
  fetchData('post', URL.verifyOTP, { token }, true);
