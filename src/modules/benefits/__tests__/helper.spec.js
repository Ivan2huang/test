import employeeBenefitResponse from './data/employeeBenefitTestData.json';
import policyDetailsResponse from './data/policyDetailsTestData.json';
import policyPlanExpectedData from './data/policyPlansExpectedData.json';

import {
  enrichProfileWithBenefits,
  enrichUserProfileWithMemberProfileOrder,
  orderMembersByRole,
} from '../helper';

describe('Helper', () => {
  it('should return user profile with benefits for member with no dependents', () => {
    const userProfile = {
      fullName: 'William Brown',
      memberId: '3',
      dependants: [],
      preferredLocale: 'en-HK',
      role: 'Employee',
      relationship: 'Employee',
      relationshipToEmployee: 'Self',
      workEmail: 'test3@test.com',
      email: 'william@abc.com',
      hasLoggedIn: true,
    };
    const healthCards = [{ memberId: '3', type: 'PRIMARY' }];

    const memberOnlyPolicyExtectedNode = policyPlanExpectedData['5'];
    const memberOnlyPolicyExtectedPlans = { '5': memberOnlyPolicyExtectedNode };

    const expected = {
      hasLoggedIn: true,
      fullName: 'William Brown',
      memberId: '3',
      membershipNumber: '0000130',
      role: 'Employee',
      relationship: 'Employee',
      relationshipToEmployee: 'Self',
      preferredLocale: 'en-HK',
      workEmail: 'test3@test.com',
      email: 'william@abc.com',
      planId: 5,
      checkpointVisits: [],
      relationships: [],
      coPayments: {
        5: {
          GP: 50,
          GPText: '$50',
          SP: 20,
          SPText: '$20',
          PHY: 20,
          PHYText: '$20',
        },
      },
      healthCards: [{ memberId: '3', type: 'PRIMARY' }],
      policy: {
        policyNumber: '10288801GH',
        insurer: {
          code: 2251,
          name: 'AXA General Insurance Hong Kong Limited',
        },
        expiryDate: '2019-12-31T00:00:00',
        initialDate: '2019-01-01T00:00:00',
        plans: memberOnlyPolicyExtectedPlans,
      },
    };

    const actual = enrichProfileWithBenefits(
      userProfile,
      { ...employeeBenefitResponse, relationships: [] },
      healthCards,
      policyDetailsResponse,
    );

    expect(actual).toEqual(expected);
  });

  it('should return employee user profile with benefits for member and relationships', () => {
    const userProfile = {
      hasLoggedIn: true,
      fullName: 'William Brown',
      memberId: '3',
      preferredLocale: 'en-HK',
      role: 'Employee',
      relationship: 'Employee',
      relationshipToEmployee: 'Self',
      workEmail: 'test3@test.com',
      email: 'william@abc.com',
      dependants: [
        {
          fullName: 'Catherine Brown',
          memberId: '27',
          email: 'catherine@test.com',
          hasLoggedIn: false,
        },
        {
          fullName: 'George Brown',
          memberId: '28',
          email: 'george@test.com',
          hasLoggedIn: true,
        },
      ],
    };

    const healthCards = [
      { memberId: '3', type: 'PRIMARY' },
      { memberId: '27', type: 'PRIMARY' },
      { memberId: '28', type: 'SECONDARY' },
    ];

    const expected = {
      hasLoggedIn: true,
      fullName: 'William Brown',
      memberId: '3',
      membershipNumber: '0000130',
      planId: 5,
      preferredLocale: 'en-HK',
      role: 'Employee',
      relationship: 'Employee',
      relationshipToEmployee: 'Self',
      workEmail: 'test3@test.com',
      email: 'william@abc.com',
      checkpointVisits: [],
      relationships: [
        {
          fullName: 'Catherine Brown',
          memberId: '27',
          membershipNumber: '0000131',
          email: 'catherine@test.com',
          planId: 1,
          checkpointVisits: [],
          hasLoggedIn: false,
        },
        {
          fullName: 'George Brown',
          memberId: '28',
          membershipNumber: '0000132',
          email: 'george@test.com',
          planId: 6,
          checkpointVisits: [],
          hasLoggedIn: true,
        },
      ],
      coPayments: {
        1: {
          GP: 50,
          GPText: '$50',
          SP: 20,
          SPText: '$20',
          PHY: 20,
          PHYText: '$20',
        },
        5: {
          GP: 50,
          GPText: '$50',
          SP: 20,
          SPText: '$20',
          PHY: 20,
          PHYText: '$20',
        },
        6: {
          GP: 50,
          GPText: '$50',
          SP: 20,
          SPText: '$20',
          PHY: 20,
          PHYText: '$20',
        },
      },
      healthCards: [
        { memberId: '3', type: 'PRIMARY' },
        { memberId: '27', type: 'PRIMARY' },
        { memberId: '28', type: 'SECONDARY' },
      ],
      policy: {
        policyNumber: '10288801GH',
        insurer: {
          code: 2251,
          name: 'AXA General Insurance Hong Kong Limited',
        },
        expiryDate: '2019-12-31T00:00:00',
        initialDate: '2019-01-01T00:00:00',
        plans: policyPlanExpectedData,
      },
    };

    const actual = enrichProfileWithBenefits(
      userProfile,
      employeeBenefitResponse,
      healthCards,
      policyDetailsResponse,
    );

    expect(actual).toEqual(expected);
  });

  it('should return dependent user profile with benefits for member and relationships', () => {
    const userProfile = {
      hasLoggedIn: true,
      fullName: 'William Brown',
      memberId: '3',
      preferredLocale: 'en-HK',
      role: 'Dependent',
      relationship: 'Spouse',
      relationshipToEmployee: 'Spouse',
      email: 'william@abc.com',
      dependants: [
        {
          fullName: 'Catherine Brown',
          memberId: '27',
          workEmail: 'test3@test.com',
          email: 'catherine@test.com',
          role: 'Employee',
          relationship: 'Employee',
          relationshipToEmployee: 'Self',
          hasLoggedIn: true,
        },
      ],
    };

    const healthCards = [
      { memberId: '3', type: 'PRIMARY' },
      { memberId: '27', type: 'PRIMARY' },
      { memberId: '28', type: 'SECONDARY' },
    ];

    const expected = {
      hasLoggedIn: true,
      fullName: 'William Brown',
      memberId: '3',
      membershipNumber: '0000130',
      planId: 5,
      preferredLocale: 'en-HK',
      role: 'Dependent',
      relationship: 'Spouse',
      relationshipToEmployee: 'Spouse',
      email: 'william@abc.com',
      checkpointVisits: [],
      relationships: [
        {
          fullName: 'Catherine Brown',
          memberId: '27',
          membershipNumber: '0000131',
          workEmail: 'test3@test.com',
          email: 'catherine@test.com',
          planId: 1,
          checkpointVisits: [],
          role: 'Employee',
          relationship: 'Employee',
          relationshipToEmployee: 'Self',
          hasLoggedIn: true,
        },
      ],
      coPayments: {
        1: {
          GP: 50,
          GPText: '$50',
          SP: 20,
          SPText: '$20',
          PHY: 20,
          PHYText: '$20',
        },
        5: {
          GP: 50,
          GPText: '$50',
          SP: 20,
          SPText: '$20',
          PHY: 20,
          PHYText: '$20',
        },
        6: {
          GP: 50,
          GPText: '$50',
          SP: 20,
          SPText: '$20',
          PHY: 20,
          PHYText: '$20',
        },
      },
      healthCards: [
        { memberId: '3', type: 'PRIMARY' },
        { memberId: '27', type: 'PRIMARY' },
        { memberId: '28', type: 'SECONDARY' },
      ],
      policy: {
        policyNumber: '10288801GH',
        insurer: {
          code: 2251,
          name: 'AXA General Insurance Hong Kong Limited',
        },
        expiryDate: '2019-12-31T00:00:00',
        initialDate: '2019-01-01T00:00:00',
        plans: policyPlanExpectedData,
      },
    };

    const actual = enrichProfileWithBenefits(
      userProfile,
      employeeBenefitResponse,
      healthCards,
      policyDetailsResponse,
    );

    expect(actual).toEqual(expected);
  });

  it('should return the userProfile and employee profile as is when benefits is undefined', () => {
    const userProfile = {
      hasLoggedIn: true,
      fullName: 'William Brown',
      memberId: '3',
      dependants: [
        {
          fullName: 'Catherine Brown',
          memberId: '27',
          hasLoggedIn: true,
        },
        {
          fullName: 'George Brown',
          memberId: '28',
          hasLoggedIn: true,
        },
      ],
    };
    const expected = {
      hasLoggedIn: true,
      fullName: 'William Brown',
      memberId: '3',
      relationships: [
        {
          fullName: 'Catherine Brown',
          memberId: '27',
          hasLoggedIn: true,
        },
        {
          fullName: 'George Brown',
          memberId: '28',
          hasLoggedIn: true,
        },
      ],
      dependants: [],
    };

    const actual = enrichProfileWithBenefits(
      userProfile,
      undefined,
      undefined,
      policyDetailsResponse,
    );

    expect(actual).toEqual(expected);
  });

  it('should return the userProfile undefined when member profile is response is undefined', () => {
    const userProfile = undefined;
    const expected = undefined;

    const actual = enrichProfileWithBenefits(
      userProfile,
      employeeBenefitResponse,
      undefined,
      policyDetailsResponse,
    );

    expect(actual).toEqual(expected);
  });

  it('should return userProfile as is when both member profile and benefit response are undefined', () => {
    const userProfile = undefined;
    const expected = undefined;

    const actual = enrichProfileWithBenefits(
      userProfile,
      undefined,
      undefined,
      policyDetailsResponse,
    );

    expect(actual).toEqual(expected);
  });

  it('should return user profile with benefits for member when membership and policy are undefined', () => {
    const userProfile = {
      hasLoggedIn: true,
      fullName: 'William Brown',
      memberId: '3',
      dependants: [],
      preferredLocale: 'en-Hk',
      role: 'Employee',
      relationship: 'Employee',
      relationshipToEmployee: 'Self',
      workEmail: 'test3@test.com',
      email: 'william@abc.com',
    };

    const expected = {
      hasLoggedIn: true,
      fullName: 'William Brown',
      memberId: '3',
      preferredLocale: 'en-Hk',
      workEmail: 'test3@test.com',
      email: 'william@abc.com',
      role: 'Employee',
      relationship: 'Employee',
      relationshipToEmployee: 'Self',
      membershipNumber: '0000130',
      planId: 5,
      checkpointVisits: [],
      relationships: [],
      coPayments: undefined,
      policy: {
        plans: undefined,
      },
      healthCards: undefined,
    };

    const actual = enrichProfileWithBenefits(
      userProfile,
      { ...employeeBenefitResponse, relationships: [] },
      undefined,
      undefined,
    );

    expect(actual).toEqual(expected);
  });

  it('should return user profile with additional key of memberProfileOrder', () => {
    const userProfile = {
      fullName: 'William Brown',
      memberId: '3',
      role: 'Employee',
      relationshipToEmployee: 'Self',
      relationship: 'Employee',
      membershipNumber: '0000130',
      planId: 5,
      preferredLocale: 'en-HK',
      email: 'test3@abc.com',
      checkpointVisits: [],
      policyNumber: '112',
      policy: {
        policyNumber: '111',
      },
      certificateNumber: '222',
      relationships: [
        {
          fullName: 'Catherine Brown',
          memberId: '27',
          role: 'Dependent',
          relationship: 'Spouse',
          relationshipToEmployee: 'Spouse',
          membershipNumber: '0000131',
          email: 'catherine@abc.com',
          planId: 1,
        },
        {
          fullName: 'George Brown',
          memberId: '28',
          role: 'Dependent',
          relationship: 'Child',
          relationshipToEmployee: 'Child',
          membershipNumber: '0000132',
          email: 'george@abc.com',
          planId: 6,
        },
      ],
    };

    const expected = {
      fullName: 'William Brown',
      memberId: '3',
      role: 'Employee',
      relationshipToEmployee: 'Self',
      relationship: 'Employee',
      membershipNumber: '0000130',
      planId: 5,
      policyNumber: '112',
      preferredLocale: 'en-HK',
      email: 'test3@abc.com',
      checkpointVisits: [],
      policy: {
        policyNumber: '111',
      },
      certificateNumber: '222',
      memberProfileOrder: [
        {
          memberId: '3',
          fullName: 'William Brown',
          relationshipToEmployee: 'Self',
          relationship: 'Employee',
          role: 'Employee',
          membershipNumber: '0000130',
          email: 'test3@abc.com',
          policyNumber: '111',
          certificateNumber: '222',
          profileCertificateNumber: '',
          profilePolicyNumber: '',
        },
        {
          memberId: '27',
          fullName: 'Catherine Brown',
          relationshipToEmployee: 'Spouse',
          relationship: 'Spouse',
          planId: 1,
          role: 'Dependent',
          membershipNumber: '0000131',
          email: 'catherine@abc.com',
        },
        {
          memberId: '28',
          fullName: 'George Brown',
          relationshipToEmployee: 'Child',
          relationship: 'Child',
          planId: 6,
          role: 'Dependent',
          membershipNumber: '0000132',
          email: 'george@abc.com',
        },
      ],
      relationships: [
        {
          fullName: 'Catherine Brown',
          memberId: '27',
          role: 'Dependent',
          relationshipToEmployee: 'Spouse',
          membershipNumber: '0000131',
          email: 'catherine@abc.com',
          planId: 1,
          relationship: 'Spouse',
        },
        {
          fullName: 'George Brown',
          memberId: '28',
          role: 'Dependent',
          relationshipToEmployee: 'Child',
          membershipNumber: '0000132',
          email: 'george@abc.com',
          planId: 6,
          relationship: 'Child',
        },
      ],
    };

    const actual = enrichUserProfileWithMemberProfileOrder(userProfile);

    expect(actual).toEqual(expected);
  });

  it('should return user profile with additional key of memberProfileOrder and default policyNumber', () => {
    const userProfile = {
      fullName: 'William Brown',
      memberId: '3',
      role: 'Employee',
      relationshipToEmployee: 'Self',
      relationship: 'Employee',
      membershipNumber: '0000130',
      planId: 5,
      preferredLocale: 'en-HK',
      email: 'test3@abc.com',
      checkpointVisits: [],
      certificateNumber: '222',
      relationships: [
        {
          fullName: 'Catherine Brown',
          memberId: '27',
          role: 'Dependent',
          relationship: 'Spouse',
          relationshipToEmployee: 'Spouse',
          membershipNumber: '0000131',
          email: 'catherine@abc.com',
          planId: 1,
        },
        {
          fullName: 'George Brown',
          memberId: '28',
          role: 'Dependent',
          relationship: 'Child',
          relationshipToEmployee: 'Child',
          membershipNumber: '0000132',
          email: 'george@abc.com',
          planId: 6,
        },
      ],
    };

    const expected = {
      fullName: 'William Brown',
      memberId: '3',
      role: 'Employee',
      relationshipToEmployee: 'Self',
      relationship: 'Employee',
      membershipNumber: '0000130',
      planId: 5,
      preferredLocale: 'en-HK',
      email: 'test3@abc.com',
      checkpointVisits: [],
      certificateNumber: '222',
      memberProfileOrder: [
        {
          memberId: '3',
          fullName: 'William Brown',
          relationshipToEmployee: 'Self',
          relationship: 'Employee',
          role: 'Employee',
          membershipNumber: '0000130',
          email: 'test3@abc.com',
          policyNumber: '',
          certificateNumber: '222',
          profileCertificateNumber: '',
          profilePolicyNumber: '',
          contactNumber: undefined,
          hasLoggedIn: undefined,
          relationshipCategory: undefined,
          workEmail: undefined,
        },
        {
          memberId: '27',
          fullName: 'Catherine Brown',
          relationshipToEmployee: 'Spouse',
          relationship: 'Spouse',
          planId: 1,
          role: 'Dependent',
          membershipNumber: '0000131',
          email: 'catherine@abc.com',
        },
        {
          memberId: '28',
          fullName: 'George Brown',
          relationshipToEmployee: 'Child',
          relationship: 'Child',
          planId: 6,
          role: 'Dependent',
          membershipNumber: '0000132',
          email: 'george@abc.com',
        },
      ],
      relationships: [
        {
          fullName: 'Catherine Brown',
          memberId: '27',
          role: 'Dependent',
          relationshipToEmployee: 'Spouse',
          membershipNumber: '0000131',
          email: 'catherine@abc.com',
          planId: 1,
          relationship: 'Spouse',
        },
        {
          fullName: 'George Brown',
          memberId: '28',
          role: 'Dependent',
          relationshipToEmployee: 'Child',
          membershipNumber: '0000132',
          email: 'george@abc.com',
          planId: 6,
          relationship: 'Child',
        },
      ],
    };

    const actual = enrichUserProfileWithMemberProfileOrder(userProfile);

    expect(actual).toEqual(expected);
  });

  it('should sort members and place unknown role to the last', () => {
    const members = [
      {
        role: 'unknown role',
        relationshipToEmployee: 'Child',
        relationshipCategory: 'Child',
      },
      {
        role: 'Dependent',
        relationshipToEmployee: 'Child',
        relationshipCategory: 'Child',
      },
      {
        role: 'Dependent',
        relationshipToEmployee: 'Spouse',
        relationshipCategory: 'Spouse',
      },
      {
        role: 'Employee',
        relationshipToEmployee: 'Self',
        relationshipCategory: 'Self',
      },
    ];
    const actual = orderMembersByRole(members);
    const expected = [
      {
        role: 'Employee',
        relationshipToEmployee: 'Self',
        relationshipCategory: 'Self',
      },
      {
        role: 'Dependent',
        relationshipToEmployee: 'Spouse',
        relationshipCategory: 'Spouse',
      },
      {
        role: 'Dependent',
        relationshipToEmployee: 'Child',
        relationshipCategory: 'Child',
      },
      {
        role: 'unknown role',
        relationshipToEmployee: 'Child',
        relationshipCategory: 'Child',
      },
    ];
    expect(actual).toEqual(expected);
  });

  it('should sort members and place unknown relationshipToEmployee to the last', () => {
    const members = [
      { role: 'Dependent', relationshipToEmployee: 'unknown relationship' },
      {
        role: 'Dependent',
        relationshipToEmployee: 'Spouse',
        relationshipCategory: 'Spouse',
      },
      {
        role: 'Employee',
        relationshipToEmployee: 'Self',
        relationshipCategory: 'Self',
      },
    ];
    const actual = orderMembersByRole(members);
    const expected = [
      {
        role: 'Employee',
        relationshipToEmployee: 'Self',
        relationshipCategory: 'Self',
      },
      {
        role: 'Dependent',
        relationshipToEmployee: 'Spouse',
        relationshipCategory: 'Spouse',
      },
      { role: 'Dependent', relationshipToEmployee: 'unknown relationship' },
    ];
    expect(actual).toEqual(expected);
  });
});
