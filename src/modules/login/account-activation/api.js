/* eslint-disable import/prefer-default-export */
import { fetchData } from '../../../helpers/fetch';
import URL from '../../../helpers/url';

export const requestOTPVerificationStatus = async () =>
  fetchData('get', URL.pendingActionRequestChange, null, true);

export const requestOTPVerification = async code =>
  fetchData(
    'post',
    URL.OTPVerification,
    {
      action: 'FirstLoginOTPVerification',
      token: code,
    },
    true,
  );

export const resendOTPRequest = async () =>
  fetchData(
    'post',
    URL.pendingActionsRequest,
    {
      action: 'FirstLoginOTPVerification',
    },
    true,
  );

export const fetchIdentities = async () => fetchData('get', URL.identities);
