import { call, takeLatest, put } from 'redux-saga/effects';

import { GET_LIFESTYLE_SCORE, updateLifestyleScore } from './action';
import getLifestyleScore from './api';
import { loader } from '../../loader';
import LOADER from '../../../constants/loader';
import { updateError } from '../../error/action';
import ERROR from '../../../constants/error';

export function* getLifestyleScoreSaga() {
  yield* loader(function*() {
    yield put(updateError(ERROR.lifestyleScore, false));
    const response = yield call(getLifestyleScore);
    if (response.error) {
      yield put(updateError(ERROR.lifestyleScore, true));
      return;
    }
    yield put(updateLifestyleScore(response.score));
  }, LOADER.lifestyleScore);
}

export default function* lifestyleScore() {
  yield takeLatest(GET_LIFESTYLE_SCORE, getLifestyleScoreSaga);
}
