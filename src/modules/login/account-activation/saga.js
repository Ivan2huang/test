/* eslint-disable no-empty */
import { stopSubmit } from 'redux-form';
import { all, takeLeading, put, call } from 'redux-saga/effects';

import paths from '../../../helpers/paths';
import {
  resendOTPRequest,
  requestOTPVerificationStatus,
  requestOTPVerification,
} from './api';
import { navigateTo } from '../../../helpers/helpers';

import LOADER from '../../../constants/loader';
import { loader } from '../../loader';

import {
  VERIFY,
  RESEND,
  CHECK_OTP_STATUS,
  checkOTPStatus,
  updateOTPStatus,
} from './action';
import { ERROR_REACHED_MAX, ACTIVATION_FORM } from './constant';

export function* checkOTPStatusSaga() {
  yield* loader(function*() {
    const response = yield call(requestOTPVerificationStatus);
    if (response && !response.error) {
      const firstLoginOTPVerification = response.find(
        obj => obj.type === 'FirstLoginOTPVerification',
      );
      if (firstLoginOTPVerification) {
        if (!firstLoginOTPVerification.allowedToVerify) {
          yield call(navigateTo, paths.common.accountActivationError);
        } else {
          yield put(updateOTPStatus(firstLoginOTPVerification));
        }
      }
    } else {
      yield call(navigateTo, paths.common.error);
    }
  }, LOADER.page);
}

export function* resend() {
  yield* loader(function*() {
    const response = yield call(resendOTPRequest);
    if (!response.error) {
      yield put(checkOTPStatus());
    }
  }, LOADER.page);
}

export function* verify(action) {
  const { otpCode } = action.payload;
  yield* loader(function*() {
    const response = yield call(requestOTPVerification, otpCode);
    if (response && response.error) {
      if (response.messageKey === ERROR_REACHED_MAX) {
        yield call(navigateTo, paths.common.accountActivationError);
      } else {
        yield put(stopSubmit(ACTIVATION_FORM, { otp: response.message }));
      }
    } else {
      window.location.replace(paths.common.renewToken);
    }
  }, LOADER.page);
}

export default function* accountActivationSaga() {
  yield all([takeLeading(VERIFY, verify)]);
  yield all([takeLeading(RESEND, resend)]);
  yield all([takeLeading(CHECK_OTP_STATUS, checkOTPStatusSaga)]);
}
