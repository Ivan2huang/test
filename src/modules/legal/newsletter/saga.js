import { call, takeLatest, all, put } from 'redux-saga/effects';

import { GET_NEWS_LETTER, updateNewsLetter } from './action';

import { loader } from '../../loader';
import LOADER from '../../../constants/loader';
import CONFIG from '../../../constants/config';
import getLocale from '../../../i18n/getLocale';
import { getNewsLetterCondition } from './api';

export function* getNewsLetterSaga() {
  yield* loader(function*() {
    const apiCalls = [];
    const saveResponses = {};

    apiCalls.push(call(getNewsLetterCondition, CONFIG.locales.ENGLISH));
    apiCalls.push(call(getNewsLetterCondition, CONFIG.locales.CHINESE));

    const responses = yield all(apiCalls);

    if (responses.length > 1) {
      [
        saveResponses[CONFIG.locales.ENGLISH],
        saveResponses[CONFIG.locales.CHINESE],
      ] = responses;
    } else {
      [saveResponses[getLocale()]] = responses;
    }
    yield put(updateNewsLetter(saveResponses));
  }, LOADER.page);
}

export default function* termsSaga() {
  yield takeLatest(GET_NEWS_LETTER, getNewsLetterSaga);
}
