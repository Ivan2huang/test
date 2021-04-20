import { takeLatest, call, put } from 'redux-saga/effects';

import { loader } from '../loader';
import LOADER from '../../constants/loader';
import { GET_LIFESTYLE_DETAILS, updateLifestyleDetails } from './action';
import getLifeStyleDetails from './api';

export function* getLifestyleDetailsSaga() {
  yield* loader(function*() {
    const response = yield call(getLifeStyleDetails);
    yield put(updateLifestyleDetails(response));
  }, LOADER.page);
}

export default function* lifestyleSaga() {
  yield takeLatest(GET_LIFESTYLE_DETAILS, getLifestyleDetailsSaga);
}
