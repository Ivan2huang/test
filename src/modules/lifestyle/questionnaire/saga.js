/* eslint-disable spaced-comment */
import { all, call, takeLatest, takeLeading, put } from 'redux-saga/effects';

import { loader } from '../../loader';
import LOADER from '../../../constants/loader';
import {
  SUBMIT_LIFESTYLE_QUESTIONNAIRE,
  GET_FACE_AGING_IMAGE,
  updateFaceAgingImage,
  toggleErrorModal,
} from './action';
import {
  submitLifestyleQuestionnaire,
  uploadFaceAgingImage,
  deleteFaceAgingImage,
  getFaceAgingImage,
} from './api';
import paths from '../../../helpers/paths';
import { navigateTo } from '../../../helpers/helpers';
import { QUESTIONNAIRE_TYPES } from './constants';

export function* submitQuestionnaire(action) {
  yield* loader(function*() {
    const { data } = action.payload;

    const {
      [QUESTIONNAIRE_TYPES.futureMe]: futureMe,
      isFaceAgingImageChanged,
    } = data;

    const apiCalls = [call(submitLifestyleQuestionnaire, data)];

    if (isFaceAgingImageChanged) {
      if (futureMe.image === null) {
        apiCalls.push(call(deleteFaceAgingImage));
      } else {
        apiCalls.push(call(uploadFaceAgingImage, futureMe.image));
      }
    }

    const [response, deleteOrUploadResponse] = yield all(apiCalls);
    const shouldCallErrorModal =
      deleteOrUploadResponse && deleteOrUploadResponse.error;

    if (shouldCallErrorModal) {
      yield put(toggleErrorModal(true));
    } else {
      const redirectUrl =
        response && response.error
          ? paths.common.error
          : paths.common.lifestyle;
      console.log('submitQuestionnaire redirectUrl=',redirectUrl)

      yield call(navigateTo, redirectUrl);
    }
  }, LOADER.page);
}

export function* getFaceAgingImageSaga() {
  yield* loader(function*() {
    const response = yield call(getFaceAgingImage);
    if (response && response.size > 0) {
      yield put(updateFaceAgingImage(response));
    } else {
      yield put(updateFaceAgingImage(null));
    }
  }, LOADER.page);
}

export default function* questionnaireSaga() {
  yield takeLeading(SUBMIT_LIFESTYLE_QUESTIONNAIRE, submitQuestionnaire);
  yield takeLatest(GET_FACE_AGING_IMAGE, getFaceAgingImageSaga);
}
