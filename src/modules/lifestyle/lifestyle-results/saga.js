import { call, takeLatest, put } from 'redux-saga/effects';

import { GET_LIFESTYLE_RESULTS, updateLifestyleResults } from './action';
import { loader } from '../../loader';
import getLifestyleResults from './api';
import LOADER from '../../../constants/loader';
import { updateError } from '../../error/action';
import ERROR from '../../../constants/error';

export function* getLifestyleResultsSaga() {
  yield* loader(function*() {
    yield put(updateError(ERROR.lifestyleResults, false));
    const response = yield call(getLifestyleResults);
    if (response.error) {
      yield put(updateError(ERROR.lifestyleResults, true));
      return;
    }
    yield put(updateLifestyleResults(response));
  }, LOADER.lifestyleResults);
}

export default function* lifestyleResultsSaga() {
  yield takeLatest(GET_LIFESTYLE_RESULTS, getLifestyleResultsSaga);
}
