import { all, call, put, takeLeading } from 'redux-saga/effects';

import { GET_CONTACT_INFO, updateContactInfo } from './action';
import { getContactInfo as getContactInfoApi } from './api';
import { loader } from '../loader';
import LOADER from '../../constants/loader';

export function* getContactInfoSaga({ payload: { locale } }) {
  yield* loader(function*() {
    const { details } = yield call(getContactInfoApi, locale);
    yield put(updateContactInfo(details));
  }, LOADER.page);
}

export default function* miscSaga() {
  yield all([takeLeading(GET_CONTACT_INFO, getContactInfoSaga)]);
}
