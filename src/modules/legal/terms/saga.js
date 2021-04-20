import { call, takeLatest, takeLeading, put, all } from 'redux-saga/effects';

import {
  GET_TERMS_CONDITIONS,
  ACCEPT_TERMS,
  updateTermsConditions,
} from './action';

import { loader } from '../../loader';
import { getTermsConditions, updateTermsAccepted } from './api';
import LOADER from '../../../constants/loader';
import CONFIG from '../../../constants/config';
import getLocale from '../../../i18n/getLocale';
import paths from '../../../helpers/paths';
import { navigateTo } from '../../../helpers/helpers';
import { updateMemberProfile } from '../../me/action';

export function* getTermsConditionsSaga({ payload }) {
  yield* loader(function*() {
    const apiCalls = [];
    const saveResponses = {};
    const {
      locales = [CONFIG.locales.ENGLISH, CONFIG.locales.CHINESE],
      alreadyAcceptedTerms,
    } = payload;

    if (alreadyAcceptedTerms) {
      apiCalls.push(call(getTermsConditions, getLocale()));
    } else {
      locales.forEach(locale =>
        apiCalls.push(call(getTermsConditions, locale)),
      );
    }

    const responses = yield all(apiCalls);

    if (responses.length > 1) {
      locales.forEach((locale, index) => {
        saveResponses[locale] = responses[index];
      });
    } else {
      [saveResponses[getLocale()]] = responses;
    }

    yield put(updateTermsConditions(saveResponses));
  }, LOADER.page);
}

export function* updateTermsSaga({ payload }) {
  yield* loader(function*() {
    const alreadyAcceptedEdm = !!payload.alreadyAcceptedEdm;
    const response = yield call(updateTermsAccepted, alreadyAcceptedEdm);
    if (response && response.error) {
      yield call(navigateTo, paths.common.error);
      return;
    }
    yield put(
      updateMemberProfile({
        isTermsAccepted: true,
        isEdmOptedOut: alreadyAcceptedEdm,
      }),
    );
    console.log('updateTermsSaga')
    yield call(navigateTo, paths.common.lifestyle);
  }, LOADER.page);
}

export default function* termsSaga() {
  yield takeLatest(GET_TERMS_CONDITIONS, getTermsConditionsSaga);
  yield takeLeading(ACCEPT_TERMS, updateTermsSaga);
}
