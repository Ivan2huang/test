import {
  getMemberBenefits,
  getMemberProfile,
  getHealthCards,
  getPolicyDetails,
  transformMemberDetails,
  getEmployeeProfile,
  getWallets,
  getCurrentPlanYear,
  changePersonalEmail,
  requestPersonalEmailStatus,
  changeMobileNumber,
  requestMobileNumberStatus,
  verifyOTP,
} from '../api';
import employeeProfileTestData from './data/employeeProfileTestData.json';
import { fetchData } from '../../../helpers/fetch';

jest.mock('../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../helpers/url', () => ({
  memberProfile: 'test/member',
  memberBenefits: 'test/userBenefitUrl',
  healthCards: 'test/healthCards',
  policyDetails: 'test/policyDetails',
  employeeProfile: id => `test/employeeProfile/${id}`,
  eWallets: includeDependents =>
    `test/eWallets?includeDependents?=${includeDependents}`,
  currentPlanyear: 'test/currentPlanyear',
  changePersonalEmail: 'test/changePersonalEmail',
  verifyPersonalEmailToken: 'test/verifyPersonalEmailToken',
  requestPersonalEmailStatus: 'test/requestPersonalEmailStatus',
  changeMeInfos: 'test/changeMeInfos',
  verifyOTP: 'test/verifyOTP',
}));

describe('Me Api', () => {
  it('should get the employee details with valid access token', async () => {
    fetchData.mockReturnValue(employeeProfileTestData);
    const expected = {
      clientId: 'cxadevclient1',
      memberId: '3',
      fullName: 'William Brown',
      firstName: 'William',
      lastName: 'Brown',
      email: 'william@abc.com',
      externalId: '3',
      gender: 'Male',
      dateOfBirth: '1989-09-01T00:00:00',
      role: 'Employee',
      relationship: 'Employee',
      relationshipToEmployee: 'Self',
      relationshipCategory: 'Self',
      contactNumber: '852 900011',
      preferredLocale: 'en-HK',
      relationships: [
        {
          contactNumber: null,
          dateOfBirth: '1990-01-01T00:00:00',
          email: 'cath@test.com',
          externalId: '0000124',
          firstName: 'Catherine Brown',
          fullName: 'Catherine Brown Tan',
          gender: 'Female',
          lastName: 'Tan',
          memberId: '27',
          relationshipToEmployee: 'Civil Partner',
          relationshipCategory: 'Spouse',
          role: 'Dependent',
        },
        {
          contactNumber: null,
          dateOfBirth: '1990-01-01T00:00:00',
          email: 'george@test.com',
          externalId: '0000125',
          firstName: 'George Brown',
          fullName: 'George Brown Tan',
          gender: 'Male',
          lastName: 'Tan',
          memberId: '28',
          relationshipToEmployee: 'Step Child',
          relationshipCategory: 'Child',
          role: 'Dependent',
        },
      ],
      dependants: [
        {
          contactNumber: null,
          dateOfBirth: '1990-01-01T00:00:00',
          email: 'cath@test.com',
          externalId: '0000124',
          firstName: 'Catherine Brown',
          fullName: 'Catherine Brown Tan',
          gender: 'Female',
          lastName: 'Tan',
          memberId: '27',
          relationship: 'Spouse',
          relationshipToEmployee: 'Civil Partner',
          relationshipCategory: 'Spouse',
          role: 'Dependent',
        },
        {
          contactNumber: null,
          dateOfBirth: '1990-01-01T00:00:00',
          email: 'george@test.com',
          externalId: '0000125',
          firstName: 'George Brown',
          fullName: 'George Brown Tan',
          gender: 'Male',
          lastName: 'Tan',
          memberId: '28',
          relationship: 'Child',
          relationshipToEmployee: 'Step Child',
          relationshipCategory: 'Child',
          role: 'Dependent',
        },
      ],
    };
    const actual = await getMemberProfile();

    expect(actual).toEqual(expected);
    expect(fetchData).toHaveBeenCalledWith('get', 'test/member');
  });

  it('should get employee benefit', () => {
    fetchData.mockReturnValue({});

    getMemberBenefits();

    expect(fetchData).toHaveBeenCalledWith('get', 'test/userBenefitUrl');
  });

  it('should get health cards details', () => {
    fetchData.mockReturnValue({});

    getHealthCards();

    expect(fetchData).toHaveBeenCalledWith('get', 'test/healthCards');
  });

  it('should get policy details', () => {
    fetchData.mockReturnValue({});

    getPolicyDetails();

    expect(fetchData).toHaveBeenCalledWith('get', 'test/policyDetails');
  });

  it('should return employee as undefined when server response is undefined', async () => {
    fetchData.mockReturnValue(undefined);
    const expected = undefined;
    const actual = await getMemberProfile();

    expect(actual).toEqual(expected);
    expect(fetchData).toHaveBeenCalledWith('get', 'test/member');
  });

  it('should get employee profile details', async () => {
    const employeeProfile = {
      clientId: 'cxadevclient1',
      memberId: '3',
      dateOfHire: '2018-01-01T00:00:00',
      countryOfWork: 'Hong Kong',
      designation: 'Manager',
      companyCode: 'twclient',
      workEmail: 'test3@test.com',
      externalEmployeeId: '3001',
      homeAddress: 'Hong Kong, street 12, #07-810',
    };
    fetchData.mockReturnValue(employeeProfile);
    const expected = {
      clientId: 'cxadevclient1',
      memberId: '3',
      dateOfHire: '2018-01-01T00:00:00',
      countryOfWork: 'Hong Kong',
      designation: 'Manager',
      companyCode: 'twclient',
      workEmail: 'test3@test.com',
      externalEmployeeId: '3001',
      homeAddress: 'Hong Kong, street 12, #07-810',
    };

    const actual = getEmployeeProfile(3);

    expect(actual).toEqual(expected);
    expect(fetchData).toHaveBeenCalledWith('get', 'test/employeeProfile/3');
  });

  it('should get the employee details in relationships when dependent logs in ', async () => {
    const dependentProfile = {
      clientId: 'cxadevclient1',
      memberId: '3',
      fullName: 'William Brown',
      firstName: 'William',
      lastName: 'Brown',
      email: 'william@abc.com',
      externalId: '3',
      gender: 'Male',
      dateOfBirth: '1989-09-01T00:00:00',
      role: 'Dependent',
      relationshipToEmployee: 'Partner',
      relationshipCategory: 'Spouse',
      contactNumber: '852 900011',
      preferredLocale: 'en-HK',
      relationships: [
        {
          memberId: '27',
          fullName: 'Catherine Brown Tan',
          firstName: 'Catherine Brown',
          lastName: 'Tan',
          externalId: '0000124',
          dateOfBirth: '1990-01-01T00:00:00',
          role: 'Employee',
          email: 'catherine@test.com',
          relationship: 'Employee',
          relationshipToEmployee: 'Self',
          relationshipCategory: 'Self',
        },
      ],
    };
    fetchData.mockReturnValue(dependentProfile);
    const expected = {
      clientId: 'cxadevclient1',
      memberId: '3',
      fullName: 'William Brown',
      firstName: 'William',
      lastName: 'Brown',
      email: 'william@abc.com',
      externalId: '3',
      gender: 'Male',
      dateOfBirth: '1989-09-01T00:00:00',
      role: 'Dependent',
      relationship: 'Spouse',
      relationshipToEmployee: 'Partner',
      relationshipCategory: 'Spouse',
      contactNumber: '852 900011',
      preferredLocale: 'en-HK',
      relationships: [
        {
          memberId: '27',
          fullName: 'Catherine Brown Tan',
          firstName: 'Catherine Brown',
          lastName: 'Tan',
          relationship: 'Employee',
          externalId: '0000124',
          dateOfBirth: '1990-01-01T00:00:00',
          role: 'Employee',
          email: 'catherine@test.com',
          relationshipToEmployee: 'Self',
          relationshipCategory: 'Self',
        },
      ],
      dependants: [
        {
          memberId: '27',
          fullName: 'Catherine Brown Tan',
          firstName: 'Catherine Brown',
          lastName: 'Tan',
          externalId: '0000124',
          dateOfBirth: '1990-01-01T00:00:00',
          role: 'Employee',
          email: 'catherine@test.com',
          relationship: 'Employee',
          relationshipToEmployee: 'Self',
          relationshipCategory: 'Self',
        },
      ],
    };
    const actual = await getMemberProfile();

    expect(actual).toEqual(expected);
    expect(fetchData).toHaveBeenCalledWith('get', 'test/member');
  });

  it('should return empty array for dependants when relationships does not exist', () => {
    const memberProfile = {
      fullName: 'Dummy',
      memberId: 3,
      contactNumber: 111,
      email: 'dummy@test.com',
      preferredLocale: 'en-HK',
      role: 'Employee',
    };

    const expected = {
      fullName: 'Dummy',
      memberId: 3,
      contactNumber: 111,
      email: 'dummy@test.com',
      preferredLocale: 'en-HK',
      role: 'Employee',
      dependants: [],
    };

    const actual = transformMemberDetails(memberProfile);

    expect(actual).toEqual(expected);
  });

  it('should get ewallets', () => {
    fetchData.mockReturnValue({});

    getWallets();

    expect(fetchData).toHaveBeenCalledWith('get', 'test/policyDetails');
  });

  it('should get current plan year', () => {
    fetchData.mockReturnValue({});

    getCurrentPlanYear();

    expect(fetchData).toHaveBeenCalledWith('get', 'test/currentPlanyear');
  });

  it('should call request change personal email', async () => {
    const oldEmail = 'old@example.com';
    const newEmail = 'new@example.com';
    await changePersonalEmail(oldEmail, newEmail);

    expect(fetchData).toHaveBeenCalledWith(
      'post',
      'test/changePersonalEmail',
      {
        oldEmail,
        newEmail,
      },
      true,
    );
  });

  it('should call request get personal email status', async () => {
    await requestPersonalEmailStatus();

    expect(fetchData).toHaveBeenCalledWith(
      'get',
      'test/requestPersonalEmailStatus',
      null,
      true,
    );
  });

  it('should call request to change mobile number', async () => {
    await changeMobileNumber('+86 111111');

    expect(fetchData).toHaveBeenCalledWith(
      'post',
      'test/changeMeInfos',
      {
        type: 'phoneNumber',
        value: '+86 111111',
      },
      true,
    );
  });

  it('should call request to get mobile number status', async () => {
    await requestMobileNumberStatus();

    expect(fetchData).toHaveBeenCalledWith(
      'get',
      'test/changeMeInfos',
      null,
      true,
    );
  });

  it('should call request to verify otp', async () => {
    await verifyOTP('111');

    expect(fetchData).toHaveBeenCalledWith(
      'post',
      'test/verifyOTP',
      { token: '111' },
      true,
    );
  });
});
