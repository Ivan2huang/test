import { all, takeLeading, call, put } from 'redux-saga/effects';

import {
  UPDATE_LANGUAGE_PREFERENCE,
  UPDATE_SETTINGS,
  SETTING_RESET_PASSWORD,
  updateResetPasswordResult,
} from './action';
import { getMemberProfileWithMembershipNumber } from '../action';
import updateLanguagePreference, {
  updateSettings,
  updateCookieLanguage,
  resetPassword,
} from './api';
import { loader } from '../../loader';
import LOADER from '../../../constants/loader';
import appContext from '../../../appContext';
import { navigateTo } from '../../../helpers/helpers';
import paths from '../../../helpers/paths';
import { getCookie } from '../../../helpers/auth';
import { USER_ID, CLIENT_ID } from '../../../constants/auth';

export function* updateLanguagePreferenceSaga({ payload }) {
  yield* loader(function*() {
    const hasUserId = getCookie(USER_ID);
    const shouldUpdateUserInfo =
      hasUserId &&
      (!payload.clientId || payload.clientId === getCookie(CLIENT_ID));
    const [response] = yield all([
      shouldUpdateUserInfo && call(updateLanguagePreference, payload.language),
      call(updateCookieLanguage, payload.language),
    ]);
    if (response && response.error) {
      navigateTo(paths.common.error);
    } else {
      appContext().set('locale', payload.language);
      payload.setLocaleCallback(payload.language);
      yield shouldUpdateUserInfo && put(getMemberProfileWithMembershipNumber());
    }
  }, LOADER.page);
}

export function* updateSettingsSaga({ payload }) {
  yield* loader(function*() {
    const response = yield call(updateSettings, payload.settings);
    if (response && response.error) {
      navigateTo(paths.common.error);
    } else {
      yield put(getMemberProfileWithMembershipNumber());
    }
  }, LOADER.page);
}

export function* resetPasswordSaga() {
  yield* loader(function*() {
    const response = yield call(resetPassword);
    if (response && response.error) {
      navigateTo(paths.common.error);
    } else {
      yield put(updateResetPasswordResult(true));
    }
  }, LOADER.page);
}

export default function* settingsSaga() {
  yield all([
    takeLeading(UPDATE_LANGUAGE_PREFERENCE, updateLanguagePreferenceSaga),
    takeLeading(UPDATE_SETTINGS, updateSettingsSaga),
    takeLeading(SETTING_RESET_PASSWORD, resetPasswordSaga),
  ]);
}
