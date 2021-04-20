export const ME_ID = 'me';
export const ME_PATHNAME = '/me';

export const DETAILS_ID = 'details';
export const DETAILS_NAME = 'My details';
export const DETAILS_PATHNAME = `${ME_PATHNAME}/details`;
export const INVIDE_DEP_ID = 'inviteDependent';
export const INVIDE_DEP_PATHNAME = `${DETAILS_PATHNAME}/invite`;
export const INVIDE_DEP_SUCCESS_ID = 'inviteDependentSuccess';
export const INVIDE_DEP_SUCCESS_PATHNAME = `${INVIDE_DEP_PATHNAME}/success`;
export const UPDATE_EMAIL_ID = 'updateEmail';
export const UPDATE_EMAIL_PATHNAME = `${DETAILS_PATHNAME}/update-email`;
export const UPDATE_EMAIL_SUCCESS_ID = 'updateEmailSuccess';
export const UPDATE_EMAIL_SUCCESS_PATHNAME = `${UPDATE_EMAIL_PATHNAME}/success`;

export const SETTINGS_ID = 'settings';
export const SETTINGS_NAME = 'Settings';
export const SETTINGS_PATHNAME = `${ME_PATHNAME}/settings`;

export const RESET_PASSWORD_ID = 'resetPassword';
export const RESET_PASSWORD_NAME = 'Reset password';
export const RESET_PASSWORD_PATHNAME = `${ME_PATHNAME}/reset-password`;

export const LOGOUT_ID = 'logout';
export const LOGOUT_NAME = 'Logout';
export const LOGOUT_PATHNAME = `${ME_PATHNAME}/logout`;

export const EMPLOYEE = 'Employee';

export const TIER_3 = 'Tier 3';

export const NONE = 'None';
export const TERMINATED = 'Terminated';

export const EXPIRY_DATE_FORMAT = 'DD MMM YYYY';
export const ACCOUNT_NOT_FOUND = 'ACCOUNT_NOT_FOUND';
export const BALANCE_NOT_FOUND = 'BALANCE_NOT_FOUND';
export const EMAIL_ALREADY_EXIST = 'EmailAlreadyExist';

export const CHANGE_PERSONAL_EMAIL_TOKEN_EXPIRED =
  'ChangePersonalEmailTokenExpired';

export const RESEND_EMAIL_ID = 'resendEmail';
export const RESEND_EMAIL_PATHNAME = `${DETAILS_PATHNAME}/resend-email`;

export const PROCESSING = 'Processing';

export const UPDATE_MOBILE_NUMBER_ID = 'updateMobileNumber';
export const UPDATE_MOBILE_NUMBER_PATHNAME = `${DETAILS_PATHNAME}/update-mobile-number`;
export const VERIFY_OTP_ID = 'verifyOTP';
export const VERIFY_OTP_PATHNAME = `${DETAILS_PATHNAME}/verify-otp`;
export const VERIFY_OTP_SUCCESS_ID = 'verifyOTPSuccess';
export const VERIFY_OTP_SUCCESS_PATHNAME = `${DETAILS_PATHNAME}/verify-otp/success`;
export const VERIFY_OTP_MAX_ATTEMPTS_ID = 'verifyOTPMaxAttempts';
export const VERIFY_OTP_MAX_ATTEMPTS_PATHNAME = `${DETAILS_PATHNAME}/verify-otp/max-attempts`;

export const MAX_OTP_ATTEMPT = 5;

export const PERSONAL_EMAIL_TYPE = 'personalEmail';
export const MOBILE_NUMBER_TYPE = 'phoneNumber';

export const MOBILE_NUMBER_ALREADY_EXIST = 'PhoneNumberAlreadyExist';

export const CHANGE_PHONE_NUMBER_REACHED_MAX_FAILED_ATTEMPTS =
  'ChangePhoneNumberReachedMaxFailedAttempts';

export const CHANGE_PHONE_NUMBER_OTP_INVALID = 'ChangePhoneNumberOTPInvalid';
export const CHANGE_PHONE_NUMBER_OTP_EXPIRED = 'ChangePhoneNumberOTPExpired';

export const MOBILE_SUFFIX = '.mobile';
