import { all, call, takeLatest, put } from 'redux-saga/effects';

import {
  GET_RECOMMENDATIONS,
  GET_SUGGESTION_RECOMMENDATIONS,
  updateRecommendations,
  updateSuggestionRecommendations,
} from './action';
import { loader } from '../../loader';
import LOADER from '../../../constants/loader';
import { updateError } from '../../error/action';
import ERROR from '../../../constants/error';
import { getRecommendations } from './api';

export function* getRecommendationsSaga(action) {
  const { tipCategory } = action.payload;
  yield* loader(function*() {
    yield put(updateError(ERROR.recommendations, false));
    const response = yield call(getRecommendations, tipCategory);
    if (response.error) {
      yield put(updateError(ERROR.recommendations, true));
      return;
    }
    yield put(updateRecommendations(response));
  }, LOADER.recommendations);
}

export function* getSuggestionRecommendationsSaga() {
  yield* loader(function*() {
    yield put(updateError(ERROR.suggestionRecommendations, false));
    const response = yield call(getRecommendations);
    if (response.error) {
      yield put(updateError(ERROR.suggestionRecommendations, true));
      return;
    }
    yield put(updateSuggestionRecommendations(response));
  }, LOADER.suggestionRecommendations);
}

export default function* recommendationsSaga() {
  yield all([
    takeLatest(GET_RECOMMENDATIONS, getRecommendationsSaga),
    takeLatest(
      GET_SUGGESTION_RECOMMENDATIONS,
      getSuggestionRecommendationsSaga,
    ),
  ]);
}
