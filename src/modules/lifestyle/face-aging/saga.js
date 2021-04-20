import { call, takeLatest, put } from 'redux-saga/effects';

import {
  GET_USER_FACE_AGING_CATEGORIES,
  DELETE_FACE_AGING_IMAGE,
  updateUserFaceAgingCategories,
} from './action';
import { loader } from '../../loader';
import getFaceAgingCategories, { deleteFaceAgingImage } from './api';
import LOADER from '../../../constants/loader';
import { updateError } from '../../error/action';
import ERROR from '../../../constants/error';
import { delay, navigateTo } from '../../../helpers/helpers';
import paths from '../../../helpers/paths';

const maximumAttemps = 6;
const waitFor = 1000 * 10;

export function* getFaceAgingCategoriesSaga() {
  let attempts = 0;
  yield* loader(function*() {
    yield put(updateError(ERROR.faceAgingCategories, false));
    let response = yield call(getFaceAgingCategories);
    while (
      response &&
      !response.error &&
      !response.faceAgingIsDone &&
      attempts < maximumAttemps
    ) {
      attempts += 1;
      yield call(delay, waitFor);
      response = yield call(getFaceAgingCategories);
    }
    if (!response) {
      yield put(updateUserFaceAgingCategories(false, []));
      return;
    }
    if (response.error) {
      yield call(deleteFaceAgingImage);
      yield put(updateError(ERROR.faceAgingCategories, true));
      return;
    }
    yield put(
      updateUserFaceAgingCategories(response.faceAgingIsDone, response.results),
    );
  }, LOADER.faceAgingCategories);
}

export function* deleteFaceAgingImageSaga() {
  const response = yield call(deleteFaceAgingImage);
  if (response && response.error) {
    yield call(navigateTo, paths.common.error);
  } else {
    yield call(navigateTo, paths.common.questionnaire, {
      pos: 'faceAging',
    });
  }
}

export default function* faceAgingSaga() {
  yield takeLatest(GET_USER_FACE_AGING_CATEGORIES, getFaceAgingCategoriesSaga);
  yield takeLatest(DELETE_FACE_AGING_IMAGE, deleteFaceAgingImageSaga);
}
