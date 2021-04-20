import { call, takeLatest, put, all } from 'redux-saga/effects';

import { GET_PRIVACY_POLICY, updatePrivacyPolicy } from './action';

import { loader } from '../../loader';
import getPrivacyPolicy from './api';
import LOADER from '../../../constants/loader';
import getLocale from '../../../i18n/getLocale';

export function* getPrivacyPolicySaga({ payload }) {
  yield* loader(function*() {
    const apiCalls = [];
    const saveResponses = {};
    const { locales } = payload;
    locales.forEach(locale => apiCalls.push(call(getPrivacyPolicy, locale)));

    const responses = yield all(apiCalls);

    if (responses.length > 1) {
      locales.forEach((locale, index) => {
        saveResponses[locale] = responses[index];
      });
    } else {
      [saveResponses[getLocale()]] = responses;
    }

    yield put(updatePrivacyPolicy(saveResponses));
  }, LOADER.page);
}
export default function* privacyPolicySaga() {
  yield takeLatest(GET_PRIVACY_POLICY, getPrivacyPolicySaga);
}
