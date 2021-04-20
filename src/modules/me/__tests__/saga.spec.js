import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import meSaga, {
  getMemberProfileSaga,
  getMemberProfileWithMembershipNumberSaga,
  changePersonalEmailSaga,
  requestPersonalEmailStatusSaga,
  changeMobileNumberSaga,
  resendOTPSaga,
  verifyOTPSaga,
  requestMobileNumberStatusSaga,
} from '../saga';
import { hasEHealthCardStatusSelector } from '../selector';

import {
  GET_MEMBER_PROFILE,
  updateMemberProfile,
  GET_MEMBER_PROFILE_WITH_MEMBERSHIP_NUMBER,
  updatePersonalEmailStatus,
  requestMobileNumberStatus as requestMobileNumberStatusAction,
  updateMobileNumberStatus,
} from '../action';

import {
  getMemberBenefits,
  getMemberProfile,
  getHealthCards,
  getPolicyDetails,
  changePersonalEmail,
  requestPersonalEmailStatus,
  changeMobileNumber,
  verifyOTP,
  requestMobileNumberStatus,
} from '../api';
import {
  enrichProfileWithBenefits,
  enrichUserProfileWithMemberProfileOrder,
} from '../helper';

import { navigateTo } from '../../../helpers/helpers';

jest.mock('../helper', () => ({
  enrichProfileWithBenefits: jest.fn(),
  enrichUserProfileWithMemberProfileOrder: jest.fn(),
}));

jest.mock('../action', () => ({
  GET_MEMBER_PROFILE: 'GET_MEMBER_PROFILE',
  getMemberProfile: jest.fn(() => 'GET_MEMBER'),
  updateMemberProfile: jest.fn(payload => ({ type: 'UPDATE_MEMBER', payload })),
  updateMembershipDetails: jest.fn(payload => ({
    type: 'UPDATE_MEMBERSHIP_DETAILS',
    payload,
  })),
  updatePolicyDetails: jest.fn(payload => ({
    type: 'UPDATE_POLICY_DETAILS',
    payload,
  })),
  GET_MEMBER_PROFILE_WITH_MEMBERSHIP_NUMBER:
    'GET_MEMBER_PROFILE_WITH_MEMBERSHIP_NUMBER',
  GET_MEMBERSHIP_DETAILS_WITH_COPAYMENT:
    'GET_MEMBERSHIP_DETAILS_WITH_COPAYMENT',
  CHANGE_PERSONAL_EMAIL: 'CHANGE_PERSONAL_EMAIL',
  changePersonalEmail: jest.fn(payload => ({
    type: 'CHANGE_PERSONAL_EMAIL',
    payload,
  })),
  requestPersonalEmailStatus: jest.fn(payload => ({
    type: 'REQUEST_PERSONAL_EMAIL_STATUS',
    payload,
  })),
  updatePersonalEmailStatus: jest.fn(payload => ({
    type: 'UPDATE_PERSONAL_EMAIL_STATUS',
    payload,
  })),
  requestMobileNumberStatus: jest.fn(payload => ({
    type: 'REQUEST_MOBILE_NUMBER_STATUS',
    payload,
  })),
  updateMobileNumberStatus: jest.fn(payload => ({
    type: 'UPDATE_MOBILE_NUMBER_STATUS',
    payload,
  })),
}));

jest.mock('../api', () => ({
  getMemberBenefits: jest.fn(),
  getMemberProfile: jest.fn(),
  getHealthCards: jest.fn(),
  getPolicyDetails: jest.fn(),
  getEmployeeProfile: jest.fn(),
  changePersonalEmail: jest.fn(),
  requestPersonalEmailStatus: jest.fn(),
  changeMobileNumber: jest.fn(),
  verifyOTP: jest.fn(),
  requestMobileNumberStatus: jest.fn(),
}));

jest.mock('../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

jest.mock('../../../helpers/helpers.js', () => ({
  navigateTo: jest.fn(),
}));

jest.mock('../selector', () => ({
  hasEHealthCardStatusSelector: jest.fn(),
}));

const defaultMobileNumberStatus = {
  newValue: '',
  attemptCount: 0,
  nextOTPRequestAllowedAtUtc: '',
};

describe('Me Saga', () => {
  it('should watch actions', () => {
    const generator = meSaga();

    const next = generator.next();

    expect(next.value).toEqual(
      all([
        takeLatest(GET_MEMBER_PROFILE, getMemberProfileSaga),
        takeLatest(
          GET_MEMBER_PROFILE_WITH_MEMBERSHIP_NUMBER,
          getMemberProfileWithMembershipNumberSaga,
        ),
      ]),
    );
  });

  it('should get and update the member profile with membership number', () => {
    const mockedUserProfile = {
      fullName: 'William Brown',
      memberId: '1',
      planId: 5,
      relationships: [
        {
          fullName: 'Catherine Brown',
          planId: 1,
        },
        {
          fullName: 'George Brown',
          planId: 2,
        },
      ],
      membership: {},
      policy: {},
    };

    const mockUserProfileWithMemberProfileOrder = {
      fullName: 'William Brown',
      memberId: '1',
      planId: 5,
      memberProfileOrder: [
        {
          fullName: 'William Brown',
          memberId: '1',
          planId: 5,
        },
        {
          fullName: 'Catherine Brown',
          planId: 1,
        },
        {
          fullName: 'George Brown',
          planId: 2,
        },
      ],
      relationships: [
        {
          fullName: 'Catherine Brown',
          planId: 1,
        },
        {
          fullName: 'George Brown',
          planId: 2,
        },
      ],
      membership: {},
      policy: {},
    };
    enrichProfileWithBenefits.mockReturnValue(mockedUserProfile);
    enrichUserProfileWithMemberProfileOrder.mockReturnValue(
      mockUserProfileWithMemberProfileOrder,
    );

    const profileResponse = {
      fullName: 'William Brown',
      memberId: '3',
      dependants: [
        {
          fullName: 'Catherine Brown',
          memberId: '27',
          relationship: 'Spouse',
        },
        {
          fullName: 'George Brown',
          memberId: '28',
          relationship: 'Child',
        },
      ],
    };
    const benefitResponse = {
      member: {
        memberId: '3',
        planId: 5,
      },
      relationships: [
        {
          memberId: '27',
          planId: 1,
        },
        {
          memberId: '28',
          planId: 2,
        },
      ],
    };

    const membershipResponse = {
      member: {
        memberId: '3',
        membershipNumber: '0000103',
      },
      relationships: [
        {
          memberId: '27',
          membershipNumber: '0000127',
        },
        {
          memberId: '28',
          membershipNumber: '0000128',
        },
      ],
    };

    const policyResponse = {
      policyNumber: '10288801GH',
      insurer: {
        code: 2251,
        name: 'Insurer company',
      },
      expiryDate: '2019-12-31T00:00:00',
      initialDate: '2019-01-01T00:00:00',
      plans: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    };

    const generator = getMemberProfileWithMembershipNumberSaga();
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(select(hasEHealthCardStatusSelector));
    next = generator.next(true);
    expect(next.value).toEqual(
      all([
        call(getMemberProfile),
        call(getMemberBenefits),
        call(getHealthCards),
        call(getPolicyDetails),
      ]),
    );
    next = generator.next([
      profileResponse,
      benefitResponse,
      membershipResponse,
      policyResponse,
    ]);
    expect(enrichProfileWithBenefits).toHaveBeenCalledTimes(1);
    expect(enrichProfileWithBenefits).toHaveBeenCalledWith(
      profileResponse,
      benefitResponse,
      membershipResponse,
      policyResponse,
    );
    expect(enrichUserProfileWithMemberProfileOrder).toHaveBeenCalledTimes(1);
    expect(enrichUserProfileWithMemberProfileOrder).toHaveBeenCalledWith(
      mockedUserProfile,
    );
    expect(next.value).toEqual(
      put(updateMemberProfile(mockUserProfileWithMemberProfileOrder)),
    );

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should get and update the member profile', () => {
    const profileResponse = {
      fullName: 'William Brown',
      memberId: '3',
    };

    const generator = getMemberProfileSaga();
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(getMemberProfile));
    next = generator.next(profileResponse);
    expect(next.value).toEqual(put(updateMemberProfile(profileResponse)));

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should call request to change personal email', () => {
    const payload = {
      oldEmail: 'old@example.com',
      newEmail: 'new@example.com',
      errorMessage: 'Error',
      reject: jest.fn(),
    };

    const requestResponse = {
      error: false,
    };

    const generator = changePersonalEmailSaga({ payload });
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(
      call(changePersonalEmail, payload.oldEmail, payload.newEmail),
    );
    next = generator.next(requestResponse);
    expect(next.value).toEqual(
      call(navigateTo, '/me/details/update-email/success', {
        email: payload.newEmail,
      }),
    );

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should handle duplicate email when request to change personal email', () => {
    const payload = {
      oldEmail: 'old@example.com',
      newEmail: 'new@example.com',
      errorMessage: 'Error',
      reject: jest.fn(),
    };

    const requestResponse = {
      error: true,
      messageKey: 'EmailAlreadyExist',
    };

    const generator = changePersonalEmailSaga({ payload });
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(
      call(changePersonalEmail, payload.oldEmail, payload.newEmail),
    );
    next = generator.next(requestResponse);
    expect(next.value).toEqual(
      call(
        payload.reject,
        new SubmissionError({ _error: true, email: 'Error' }),
      ),
    );

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should navigate to error page when request to change personal email error', () => {
    const payload = {
      oldEmail: 'old@example.com',
      newEmail: 'new@example.com',
      errorMessage: 'Error',
      reject: jest.fn(),
    };

    const requestResponse = {
      error: true,
    };

    const generator = changePersonalEmailSaga({ payload });
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(
      call(changePersonalEmail, payload.oldEmail, payload.newEmail),
    );
    next = generator.next(requestResponse);
    expect(next.value).toEqual(call(navigateTo, '/error'));

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should reset personal email status to default when no content response', () => {
    const payload = {};
    const generator = requestPersonalEmailStatusSaga({ payload });
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toStrictEqual(call(requestPersonalEmailStatus));
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(
        updatePersonalEmailStatus({
          email: '',
          status: 'None',
        }),
      ),
    );

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should reset personal email status to default when error', () => {
    const payload = {};
    const generator = requestPersonalEmailStatusSaga({ payload });
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toStrictEqual(call(requestPersonalEmailStatus));
    next = generator.next({ error: true });
    expect(next.value).toStrictEqual(
      put(
        updatePersonalEmailStatus({
          email: '',
          status: 'None',
        }),
      ),
    );

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should navigate to error page when personal email have navigate flag and service return error', () => {
    const payload = {
      shouldNavigate: true,
    };
    const generator = requestPersonalEmailStatusSaga({ payload });
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toStrictEqual(call(requestPersonalEmailStatus));
    next = generator.next({ error: true });
    expect(next.value).toStrictEqual(call(navigateTo, '/error'));

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should navigate to details page when personal email have navigate flag and the status does not match', () => {
    const payload = {
      shouldNavigate: true,
      statusForCheck: 'Processing',
    };
    const generator = requestPersonalEmailStatusSaga({ payload });
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toStrictEqual(call(requestPersonalEmailStatus));
    next = generator.next({ error: false, status: 'None' });
    expect(next.value).toStrictEqual(call(navigateTo, '/me/details'));

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should update personal email status', () => {
    const payload = {
      shouldNavigate: true,
      statusForCheck: 'Processing',
    };
    const generator = requestPersonalEmailStatusSaga({ payload });
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toStrictEqual(call(requestPersonalEmailStatus));
    next = generator.next({
      status: 'Processing',
      email: 'test@example.com',
    });
    expect(next.value).toStrictEqual(
      put(
        updatePersonalEmailStatus({
          email: 'test@example.com',
          status: 'Processing',
        }),
      ),
    );

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should change mobile number', () => {
    const action = {
      payload: {
        mobileNumber: '+86 111',
        errorMessage: 'test error',
        reject: jest.fn(),
      },
    };
    const generator = changeMobileNumberSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(changeMobileNumber, '+86 111'));
    next = generator.next();
    expect(next.value).toEqual(call(navigateTo, '/me/details/verify-otp'));

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should change mobile number when server response success', () => {
    const action = {
      payload: {
        mobileNumber: '+86 111',
        errorMessage: 'test error',
        reject: jest.fn(),
      },
    };
    const generator = changeMobileNumberSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(changeMobileNumber, '+86 111'));
    next = generator.next({ success: true });
    expect(next.value).toEqual(call(navigateTo, '/me/details/verify-otp'));

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should handle error when change mobile number with mobile number already exists', () => {
    const action = {
      payload: {
        mobileNumber: '+86 111',
        errorMessage: 'test error',
        reject: jest.fn(),
      },
    };
    const phoneAlreadyExistError = {
      error: true,
      messageKey: 'PhoneNumberAlreadyExist',
    };
    const generator = changeMobileNumberSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(changeMobileNumber, '+86 111'));
    next = generator.next(phoneAlreadyExistError);
    expect(next.value).toEqual(
      call(action.payload.reject, new SubmissionError({ _error: true })),
    );

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should navigate to max attempts page when change mobile number reach limit', () => {
    const action = {
      payload: {
        mobileNumber: '+86 111',
        errorMessage: 'test error',
        reject: jest.fn(),
      },
    };
    const reachedMaxFailedAttemptsError = {
      error: true,
      messageKey: 'ChangePhoneNumberReachedMaxFailedAttempts',
    };
    const generator = changeMobileNumberSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(changeMobileNumber, '+86 111'));
    next = generator.next(reachedMaxFailedAttemptsError);
    expect(next.value).toEqual(
      call(navigateTo, '/me/details/verify-otp/max-attempts'),
    );

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should navigate to error page when change mobile error', () => {
    const action = {
      payload: {
        mobileNumber: '+86 111',
        errorMessage: 'test error',
        reject: jest.fn(),
      },
    };
    const generalError = {
      error: true,
    };
    const generator = changeMobileNumberSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(changeMobileNumber, '+86 111'));
    next = generator.next(generalError);
    expect(next.value).toEqual(call(navigateTo, '/error'));

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should resend otp mobile number', () => {
    const action = {
      payload: {
        mobileNumber: '+86 111',
      },
    };
    const generator = resendOTPSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(changeMobileNumber, '+86 111'));
    next = generator.next();
    expect(next.value).toEqual(put(requestMobileNumberStatusAction(true)));

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should navigate to max attempts page when resend mobile number reach limit', () => {
    const action = {
      payload: {
        mobileNumber: '+86 111',
      },
    };
    const reachedMaxFailedAttemptsError = {
      error: true,
      messageKey: 'ChangePhoneNumberReachedMaxFailedAttempts',
    };
    const generator = resendOTPSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(changeMobileNumber, '+86 111'));
    next = generator.next(reachedMaxFailedAttemptsError);
    expect(next.value).toEqual(
      call(navigateTo, '/me/details/verify-otp/max-attempts'),
    );
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should navigate to error page when resend mobile number error', () => {
    const action = {
      payload: {
        mobileNumber: '+86 111',
      },
    };
    const generator = resendOTPSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(changeMobileNumber, '+86 111'));
    next = generator.next({ error: true });
    expect(next.value).toEqual(call(navigateTo, '/error'));
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should navigate to error page when unexpected resend mobile number error', () => {
    const action = null;
    const generator = resendOTPSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(navigateTo, '/error'));
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should verify otp', () => {
    const action = {
      payload: {
        token: '111',
        errorMessage: 'test error',
        reject: jest.fn(),
      },
    };
    const generator = verifyOTPSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(verifyOTP, '111'));
    next = generator.next({ success: true });
    expect(next.value).toEqual(
      call(navigateTo, '/me/details/verify-otp/success'),
    );
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should navigate to max attempts otp when reach limited', () => {
    const action = {
      payload: {
        token: '111',
        errorMessage: 'test error',
        reject: jest.fn(),
      },
    };
    const generator = verifyOTPSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(verifyOTP, '111'));
    next = generator.next({
      error: true,
      messageKey: 'ChangePhoneNumberReachedMaxFailedAttempts',
    });
    expect(next.value).toEqual(
      call(navigateTo, '/me/details/verify-otp/max-attempts'),
    );
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should generate error form message when error on verify otp', () => {
    const action = {
      payload: {
        token: '111',
        errorMessage: 'test error',
        reject: jest.fn(),
      },
    };
    const generator = verifyOTPSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(verifyOTP, '111'));
    next = generator.next({
      error: true,
    });
    expect(next.value).toEqual(
      call(action.payload.reject, new SubmissionError({ _error: true })),
    );
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should update default mobile number status when no response from server', () => {
    const action = {
      payload: {
        shouldNavigate: false,
      },
    };
    const generator = requestMobileNumberStatusSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(requestMobileNumberStatus));
    next = generator.next();
    expect(next.value).toEqual(
      put(updateMobileNumberStatus(defaultMobileNumberStatus)),
    );
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should update default mobile number status when server response error', () => {
    const action = {
      payload: {
        shouldNavigate: false,
      },
    };
    const generator = requestMobileNumberStatusSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(requestMobileNumberStatus));
    next = generator.next({ error: true });
    expect(next.value).toEqual(
      put(updateMobileNumberStatus(defaultMobileNumberStatus)),
    );
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should navigate to error when server response error and should navigate flag enabled', () => {
    const action = {
      payload: {
        shouldNavigate: true,
      },
    };
    const generator = requestMobileNumberStatusSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(requestMobileNumberStatus));
    next = generator.next();
    next = generator.next({ error: true });
    expect(next.value).toEqual(call(navigateTo, '/error'));
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should navigate to max attempts page when get request mobile status with should navigate flag enabled', () => {
    const action = {
      payload: {
        shouldNavigate: true,
      },
    };
    const maxAttemptsResponse = {
      phoneNumber: {
        newValue: '+86 111',
        allowedToVerify: false,
      },
    };

    const generator = requestMobileNumberStatusSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(requestMobileNumberStatus));

    next = generator.next(maxAttemptsResponse);
    expect(next.value).toEqual(
      call(navigateTo, '/me/details/verify-otp/max-attempts'),
    );

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should navigate to error page when no phone number return from server and should navigate flag enabled', () => {
    const action = {
      payload: {
        shouldNavigate: true,
      },
    };
    const noPhoneNumberResponse = {
      phoneNumber: {
        newValue: '',
        allowedToVerify: true,
      },
    };

    const generator = requestMobileNumberStatusSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(requestMobileNumberStatus));

    next = generator.next(noPhoneNumberResponse);
    expect(next.value).toEqual(call(navigateTo, '/error'));

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should get mobile number status success', () => {
    const action = {
      payload: {
        shouldNavigate: true,
      },
    };
    const phoneNumberResponse = {
      phoneNumber: {
        newValue: '+86 111',
        allowedToVerify: true,
      },
    };

    const generator = requestMobileNumberStatusSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(requestMobileNumberStatus));

    next = generator.next(phoneNumberResponse);
    expect(next.value).toEqual(
      put(
        updateMobileNumberStatus({
          newValue: '+86 111',
          allowedToVerify: true,
        }),
      ),
    );

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should navigate to error page when unexpected error happen when get mobile number status', () => {
    const action = null;
    const generator = requestMobileNumberStatusSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(navigateTo, '/error'));
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });
});
