import actionCreator from '../../../helpers/action';

export const VERIFY = 'VERIFY';
export const RESEND = 'RESEND';
export const CHECK_OTP_STATUS = 'CHECK_OTP_STATUS';
export const UPDATE_OTP_STATUS = 'UPDATE_OTP_STATUS';
export const STORE_USER_EMAIL = 'STORE_USER_EMAIL';

export const verify = actionCreator(VERIFY, 'otpCode');
export const resend = actionCreator(RESEND);
export const checkOTPStatus = actionCreator(CHECK_OTP_STATUS);
export const updateOTPStatus = actionCreator(UPDATE_OTP_STATUS, 'status');
export const storeUserEmail = actionCreator(STORE_USER_EMAIL, 'email');
