import {
  getMemberProfile,
  updateMemberProfile,
  getMemberProfileWithMembershipNumber,
  getMembershipDetails,
  updateMembershipDetails,
  getPolicyDetails,
  updatePolicyDetails,
  getMembershipDetailsWithCoPayment,
  changePersonalEmail,
  requestPersonalEmailStatus,
  updatePersonalEmailStatus,
} from '../action';

describe('Me Action', () => {
  it('should create get member profile action', () => {
    const actual = getMemberProfile();
    const expected = {
      type: 'GET_MEMBER_PROFILE',
      payload: {},
    };

    expect(actual).toEqual(expected);
  });

  it('should create update member profile action', () => {
    const actual = updateMemberProfile({
      name: 'testing',
    });
    const expected = {
      type: 'UPDATE_MEMBER_PROFILE',
      payload: {
        memberProfile: {
          name: 'testing',
        },
      },
    };

    expect(actual).toEqual(expected);
  });

  it('should create get member profile with membership number action', () => {
    const actual = getMemberProfileWithMembershipNumber();
    const expected = {
      type: 'GET_MEMBER_PROFILE_WITH_MEMBERSHIP_NUMBER',
      payload: {},
    };

    expect(actual).toEqual(expected);
  });

  it('should create get membership details action', () => {
    const actual = getMembershipDetails();
    const expected = {
      type: 'GET_MEMBERSHIP_DETAILS',
      payload: {},
    };

    expect(actual).toEqual(expected);
  });

  it('should create update membership details action', () => {
    const actual = updateMembershipDetails({
      name: 'testing',
    });
    const expected = {
      type: 'UPDATE_MEMBERSHIP_DETAILS',
      payload: {
        membership: {
          name: 'testing',
        },
      },
    };

    expect(actual).toEqual(expected);
  });

  it('should create get policy details action', () => {
    const actual = getPolicyDetails();
    const expected = {
      type: 'GET_POLICY_DETAILS',
      payload: {},
    };

    expect(actual).toEqual(expected);
  });

  it('should create update policy details action', () => {
    const actual = updatePolicyDetails({
      name: 'testing',
    });
    const expected = {
      type: 'UPDATE_POLICY_DETAILS',
      payload: {
        policy: {
          name: 'testing',
        },
      },
    };

    expect(actual).toEqual(expected);
  });

  it('should create get membership details with copayment action', () => {
    const actual = getMembershipDetailsWithCoPayment();
    const expected = {
      type: 'GET_MEMBERSHIP_DETAILS_WITH_COPAYMENT',
      payload: {},
    };

    expect(actual).toEqual(expected);
  });

  it('should request to change personal email action', () => {
    const reject = jest.fn();
    const actual = changePersonalEmail(
      'oldEmail@test.com',
      'newEmail@test.com',
      'Error Message...',
      reject,
    );
    const expected = {
      type: 'CHANGE_PERSONAL_EMAIL',
      payload: {
        oldEmail: 'oldEmail@test.com',
        newEmail: 'newEmail@test.com',
        errorMessage: 'Error Message...',
        reject,
      },
    };

    expect(actual).toEqual(expected);
  });

  it('should request status of personal email', () => {
    const actual = requestPersonalEmailStatus(true, 'None');

    const expected = {
      type: 'REQUEST_PERSONAL_EMAIL_STATUS',
      payload: {
        shouldNavigate: true,
        statusForCheck: 'None',
      },
    };

    expect(actual).toEqual(expected);
  });

  it('should update status of personal email', () => {
    const actual = updatePersonalEmailStatus({
      email: 'requestedEmail@test.com',
      status: 'Processing',
    });

    const expected = {
      type: 'UPDATE_PERSONAL_EMAIL_STATUS',
      payload: {
        status: {
          email: 'requestedEmail@test.com',
          status: 'Processing',
        },
      },
    };

    expect(actual).toEqual(expected);
  });
});
