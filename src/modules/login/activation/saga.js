import { all, call, takeLeading, put } from 'redux-saga/effects';
import logger from '../../../helpers/logger';

import { VALIDATE_ACTIVATION, updateValidationStatus } from './action';
import { validateActivation as validateActivationApi } from './api';
import { VERIFICATION_SUCCESS, UNKNOWN_ERROR } from './constant';

export function* validateActivation(action) {
  try {
    const { client, token } = action.payload;
    const response = yield call(validateActivationApi, client, token);
    if (response && response.error) {
      yield put(updateValidationStatus(response.messageKey));
    } else {
      yield put(updateValidationStatus(VERIFICATION_SUCCESS));
    }
  } catch (error) {
    logger.error('---validateActivation -> ERROR---', error);
    yield put(updateValidationStatus(UNKNOWN_ERROR));
  }
}

export default function* validateActivationSaga() {
  yield all([takeLeading(VALIDATE_ACTIVATION, validateActivation)]);
}
