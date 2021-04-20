import actionCreator from '../../helpers/action';

export const GET_MEMBER_PROFILE = 'GET_MEMBER_PROFILE';
export const UPDATE_MEMBER_PROFILE = 'UPDATE_MEMBER_PROFILE';

export const GET_MEMBERSHIP_DETAILS = 'GET_MEMBERSHIP_DETAILS';
export const UPDATE_MEMBERSHIP_DETAILS = 'UPDATE_MEMBERSHIP_DETAILS';

export const GET_POLICY_DETAILS = 'GET_POLICY_DETAILS';
export const UPDATE_POLICY_DETAILS = 'UPDATE_POLICY_DETAILS';

export const GET_MEMBER_PROFILE_WITH_MEMBERSHIP_NUMBER =
  'GET_MEMBER_PROFILE_WITH_MEMBERSHIP_NUMBER';
export const GET_MEMBERSHIP_DETAILS_WITH_COPAYMENT =
  'GET_MEMBERSHIP_DETAILS_WITH_COPAYMENT';

export const CHANGE_PERSONAL_EMAIL = 'CHANGE_PERSONAL_EMAIL';

export const REQUEST_PERSONAL_EMAIL_STATUS = 'REQUEST_PERSONAL_EMAIL_STATUS';
export const UPDATE_PERSONAL_EMAIL_STATUS = 'UPDATE_PERSONAL_EMAIL_STATUS';

export const CHANGE_MOBILE_NUMBER = 'CHANGE_MOBILE_NUMBER';
export const REQUEST_MOBILE_NUMBER_STATUS = 'REQUEST_MOBILE_NUMBER_STATUS';
export const UPDATE_MOBILE_NUMBER_STATUS = 'UPDATE_MOBILE_NUMBER_STATUS';

export const VERIFY_OTP = 'VERIFY_OTP';
export const RESEND_OTP = 'RESEND_OTP';

export const getMemberProfile = actionCreator(GET_MEMBER_PROFILE);
export const getMemberProfileWithMembershipNumber = actionCreator(
  GET_MEMBER_PROFILE_WITH_MEMBERSHIP_NUMBER,
);
export const getMembershipDetailsWithCoPayment = actionCreator(
  GET_MEMBERSHIP_DETAILS_WITH_COPAYMENT,
);
export const updateMemberProfile = actionCreator(
  UPDATE_MEMBER_PROFILE,
  'memberProfile',
);
export const getMembershipDetails = actionCreator(GET_MEMBERSHIP_DETAILS);
export const updateMembershipDetails = actionCreator(
  UPDATE_MEMBERSHIP_DETAILS,
  'membership',
);
export const getPolicyDetails = actionCreator(GET_POLICY_DETAILS);
export const updatePolicyDetails = actionCreator(
  UPDATE_POLICY_DETAILS,
  'policy',
);

export const changePersonalEmail = actionCreator(
  CHANGE_PERSONAL_EMAIL,
  'oldEmail',
  'newEmail',
  'errorMessage',
  'reject',
);
export const requestPersonalEmailStatus = actionCreator(
  REQUEST_PERSONAL_EMAIL_STATUS,
  'shouldNavigate',
  'statusForCheck',
);
export const updatePersonalEmailStatus = actionCreator(
  UPDATE_PERSONAL_EMAIL_STATUS,
  'status',
);

export const changeMobileNumber = actionCreator(
  CHANGE_MOBILE_NUMBER,
  'mobileNumber',
  'errorMessage',
  'reject',
);

export const requestMobileNumberStatus = actionCreator(
  REQUEST_MOBILE_NUMBER_STATUS,
  'shouldNavigate',
);

export const updateMobileNumberStatus = actionCreator(
  UPDATE_MOBILE_NUMBER_STATUS,
  'status',
);

export const verifyOTP = actionCreator(
  VERIFY_OTP,
  'token',
  'errorMessage',
  'reject',
);

export const resendOTP = actionCreator(RESEND_OTP, 'mobileNumber');
