import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
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
} from './api';

import {
  GET_MEMBER_PROFILE,
  GET_MEMBER_PROFILE_WITH_MEMBERSHIP_NUMBER,
  updateMemberProfile,
  CHANGE_PERSONAL_EMAIL,
  REQUEST_PERSONAL_EMAIL_STATUS,
  updatePersonalEmailStatus,
  CHANGE_MOBILE_NUMBER,
  VERIFY_OTP,
  updateMobileNumberStatus,
  REQUEST_MOBILE_NUMBER_STATUS,
  RESEND_OTP,
  requestMobileNumberStatus as requestMobileNumberStatusAction,
} from './action';
import { hasEHealthCardStatusSelector } from './selector';
import {
  enrichProfileWithBenefits,
  enrichUserProfileWithMemberProfileOrder,
} from './helper';
import LOADER from '../../constants/loader';
import { loader } from '../loader';
import { navigateTo } from '../../helpers/helpers';
import paths from '../../helpers/paths';
import {
  UPDATE_EMAIL_SUCCESS_PATHNAME,
  EMAIL_ALREADY_EXIST,
  NONE,
  DETAILS_PATHNAME,
  MOBILE_NUMBER_ALREADY_EXIST,
  VERIFY_OTP_PATHNAME,
  CHANGE_PHONE_NUMBER_REACHED_MAX_FAILED_ATTEMPTS,
  VERIFY_OTP_SUCCESS_PATHNAME,
  VERIFY_OTP_MAX_ATTEMPTS_PATHNAME,
} from './constant';

const defaultPersonalEmailStatus = {
  email: '',
  status: NONE,
};

const defaultMobileNumberStatus = {
  newValue: '',
  attemptCount: 0,
  nextOTPRequestAllowedAtUtc: '',
};

export function* getMemberProfileWithMembershipNumberSaga() {
  yield* loader(function*() {
    const hasEHealthCard = yield select(hasEHealthCardStatusSelector);
    const [memberProfile, benefits, healthCards, policy] = yield all([
      call(getMemberProfile),
      call(getMemberBenefits),
      hasEHealthCard && call(getHealthCards),
      call(getPolicyDetails),
    ]);

    const userProfile = enrichProfileWithBenefits(
      memberProfile,
      benefits,
      healthCards,
      policy,
    );
    const userProfileWithProfileOrder = enrichUserProfileWithMemberProfileOrder(
      userProfile,
    );
    yield put(updateMemberProfile(userProfileWithProfileOrder));
  }, LOADER.page);
}

export function* getMemberProfileSaga() {
  yield* loader(function*() {
    const profile = yield call(getMemberProfile);
    yield put(updateMemberProfile(profile));
  }, LOADER.page);
}

export function* changePersonalEmailSaga(action) {
  yield* loader(function*() {
    const { oldEmail, newEmail, errorMessage, reject } = action.payload;
    const response = yield call(changePersonalEmail, oldEmail, newEmail);
    const { messageKey } = response;
    if (!response || (response && !response.error)) {
      yield call(navigateTo, UPDATE_EMAIL_SUCCESS_PATHNAME, {
        email: newEmail,
      });
      return;
    }
    if (messageKey === EMAIL_ALREADY_EXIST) {
      yield call(
        reject,
        new SubmissionError({ _error: true, newEmail: errorMessage }),
      );
      return;
    }
    yield call(navigateTo, paths.common.error);
  }, LOADER.page);
}

export function* requestPersonalEmailStatusSaga(action) {
  yield* loader(function*() {
    const { shouldNavigate, statusForCheck } = action.payload;
    const response = yield call(requestPersonalEmailStatus);
    if (!response) {
      yield put(updatePersonalEmailStatus(defaultPersonalEmailStatus));
      return;
    }

    if (response.error) {
      if (shouldNavigate) {
        yield call(navigateTo, paths.common.error);
        return;
      }
      yield put(updatePersonalEmailStatus(defaultPersonalEmailStatus));
    } else {
      const shouldNavigateToDetailPage =
        shouldNavigate && response.status !== statusForCheck;
      if (shouldNavigateToDetailPage) {
        yield call(navigateTo, DETAILS_PATHNAME);
        return;
      }
      yield put(updatePersonalEmailStatus(response));
    }
  }, LOADER.page);
}

export function* changeMobileNumberSaga(action) {
  yield* loader(function*() {
    const { mobileNumber, errorMessage, reject } = action.payload;
    const response = yield call(changeMobileNumber, mobileNumber);
    if (!response || (response && !response.error)) {
      yield call(navigateTo, VERIFY_OTP_PATHNAME);
      return;
    }

    const { messageKey } = response;
    if (messageKey === MOBILE_NUMBER_ALREADY_EXIST) {
      yield call(
        reject,
        new SubmissionError({ _error: true, newMobileNumber: errorMessage }),
      );
      return;
    }
    if (messageKey === CHANGE_PHONE_NUMBER_REACHED_MAX_FAILED_ATTEMPTS) {
      yield call(navigateTo, VERIFY_OTP_MAX_ATTEMPTS_PATHNAME);
      return;
    }
    yield call(navigateTo, paths.common.error);
  }, LOADER.page);
}

export function* resendOTPSaga(action) {
  yield* loader(function*() {
    try {
      const { mobileNumber } = action.payload;
      const response = yield call(changeMobileNumber, mobileNumber);

      if (!response || !response.error) {
        yield put(requestMobileNumberStatusAction(true));
        return;
      }

      if (
        response.messageKey === CHANGE_PHONE_NUMBER_REACHED_MAX_FAILED_ATTEMPTS
      ) {
        yield call(navigateTo, VERIFY_OTP_MAX_ATTEMPTS_PATHNAME);
        return;
      }

      yield call(navigateTo, paths.common.error);
    } catch {
      yield call(navigateTo, paths.common.error);
    }
  }, LOADER.page);
}

export function* verifyOTPSaga(action) {
  yield* loader(function*() {
    const { token, errorMessage, reject } = action.payload;
    const response = yield call(verifyOTP, token);
    const { messageKey } = response;
    if (!response || (response && !response.error)) {
      yield call(navigateTo, VERIFY_OTP_SUCCESS_PATHNAME);
      return;
    }
    if (messageKey === CHANGE_PHONE_NUMBER_REACHED_MAX_FAILED_ATTEMPTS) {
      yield call(navigateTo, VERIFY_OTP_MAX_ATTEMPTS_PATHNAME);
      return;
    }
    yield call(
      reject,
      new SubmissionError({ _error: true, token: errorMessage }),
    );
  }, LOADER.page);
}

export function* requestMobileNumberStatusSaga(action) {
  yield* loader(function*() {
    try {
      const { shouldNavigate } = action.payload;
      const response = yield call(requestMobileNumberStatus);
      if (!response || !response.phoneNumber || response.error) {
        yield put(updateMobileNumberStatus(defaultMobileNumberStatus));
        if (shouldNavigate) {
          yield call(navigateTo, paths.common.error);
          return;
        }
      } else {
        const { newValue, allowedToVerify } = response.phoneNumber;
        const shouldNavigateToMaxAttemptsPage =
          shouldNavigate && !allowedToVerify;
        if (shouldNavigateToMaxAttemptsPage) {
          yield call(navigateTo, VERIFY_OTP_MAX_ATTEMPTS_PATHNAME);
          return;
        }

        const shouldNavigateToErrorPage = shouldNavigate && !newValue;
        if (shouldNavigateToErrorPage) {
          yield call(navigateTo, paths.common.error);
          return;
        }
        yield put(updateMobileNumberStatus(response.phoneNumber));
      }
    } catch (e) {
      yield call(navigateTo, paths.common.error);
    }
  }, LOADER.page);
}

export default function* meSaga() {
  yield all([
    takeLatest(GET_MEMBER_PROFILE, getMemberProfileSaga),
    takeLatest(
      GET_MEMBER_PROFILE_WITH_MEMBERSHIP_NUMBER,
      getMemberProfileWithMembershipNumberSaga,
    ),
  ]);
  yield takeLatest(CHANGE_PERSONAL_EMAIL, changePersonalEmailSaga);
  yield takeLatest(
    REQUEST_PERSONAL_EMAIL_STATUS,
    requestPersonalEmailStatusSaga,
  );
  yield takeLatest(CHANGE_MOBILE_NUMBER, changeMobileNumberSaga);
  yield takeLatest(VERIFY_OTP, verifyOTPSaga);
  yield takeLatest(REQUEST_MOBILE_NUMBER_STATUS, requestMobileNumberStatusSaga);
  yield takeLatest(RESEND_OTP, resendOTPSaga);
}
