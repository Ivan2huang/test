import { call, takeLatest, put } from 'redux-saga/effects';

import {
  GET_LIFESTYLE_HEALTH_SCORES_HISTORY,
  updateLifestyleHealthScoresHistory,
} from './action';
import { loader } from '../../loader';
import getLifestyleHealthScoreHistory from './api';
import LOADER from '../../../constants/loader';
import { updateError } from '../../error/action';
import ERROR from '../../../constants/error';

export function* getLifestyleHealthScoreHistorySaga() {
  yield* loader(function*() {
    yield put(updateError(ERROR.lifestyleHistory, false));
    const response = yield call(getLifestyleHealthScoreHistory);
    if (response.error) {
      yield put(updateError(ERROR.lifestyleHistory, true));
      return;
    }
    yield put(updateLifestyleHealthScoresHistory(response));
  }, LOADER.lifestyleHistory);
}

export default function* lifeStyleHistorySaga() {
  yield takeLatest(
    GET_LIFESTYLE_HEALTH_SCORES_HISTORY,
    getLifestyleHealthScoreHistorySaga,
  );
}
