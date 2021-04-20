import { call, put, takeLatest } from 'redux-saga/effects';

import LOADER from '../../../constants/loader';
import getUsefulDocuments from './api';
import { loader } from '../../loader';
import { GET_USEFUL_DOCUMENTS, updateUsefulDocuments } from './action';

export function* getUsefulDocumentsSaga() {
  yield* loader(function*() {
    const response = yield call(getUsefulDocuments);
    if (!response) return;
    yield put(updateUsefulDocuments(response));
  }, LOADER.page);
}

export default function* usefulDocumentsSaga() {
  yield takeLatest(GET_USEFUL_DOCUMENTS, getUsefulDocumentsSaga);
}
