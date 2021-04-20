/* eslint-disable func-names */
import { all, call, put, takeLeading } from 'redux-saga/effects';

import {
  RESET_PASSWORD,
  VALIDATE_RESET_PASSWORD_REQUEST,
  GET_PRODUCT_NAME,
  updateProductName,
} from './action';
import {
  resetPassword as resetPasswordApi,
  validateResetPasswordRequest as validateResetPasswordRequestApi,
  getProductName as getProductNameApi,
} from './api';
import { loader } from '../../loader';
import LOADER from '../../../constants/loader';
import { navigateTo } from '../../../helpers/helpers';
import { updateError } from '../../error/action';
import paths from '../../../helpers/paths';
import ERROR from '../../../constants/error';
import CONFIG from '../../../constants/config';

export function* resetPassword(action) {
  yield* loader(function*() {
    const { clientId, ...rest } = action.payload;
    const response = yield call(resetPasswordApi, clientId, rest);
    if (response && response.error) {
      if (
        response.messageKey === 'TokenExpired' ||
        response.messageKey === 'InvalidToken'
      ) {
        yield call(navigateTo, paths.common.resetPasswordLinkExpired, {
          email: action.payload.email,
          token: action.payload.token,
        });
      } else {
        yield call(navigateTo, paths.common.error);
      }
    } else if (action.payload.isFirstTimeUser) {
      yield call(navigateTo, paths.common.onBoardingSuccess, {
        productName: action.payload.productName,
      });
    } else {
      yield call(navigateTo, paths.common.resetPasswordSuccess);
    }
  }, LOADER.page);
}

export function* validateResetPasswordRequest(action) {
  yield* loader(function*() {
    yield put(updateError(ERROR.resetPassword.dateOfBirthMatch, null));
    const { isVerifyingDoB, clientId, ...rest } = action.payload;
    const response = yield call(
      validateResetPasswordRequestApi,
      clientId,
      rest,
    );
    if (response && response.error) {
      switch (response.messageKey) {
        case 'TokenExpired':
        case 'InvalidToken':
          yield call(navigateTo, paths.common.resetPasswordLinkExpired, {
            email: action.payload.email,
            token: action.payload.token,
          });
          break;
        case 'AccountLocked':
          yield put(
            updateError(ERROR.resetPassword.accountLocked, response.message),
          );
          yield call(navigateTo, paths.common.resetPasswordAccountLocked);
          break;
        case 'IncorrectDOB':
          yield put(updateError(ERROR.resetPassword.dateOfBirthMatch, true));
          break;
        case 'EmptyDOB':
          yield put(updateError(ERROR.resetPassword.dateOfBirthMatch, null));
          break;
        default:
          yield call(navigateTo, paths.common.error);
          break;
      }
    } else if (isVerifyingDoB) {
      yield put(updateError(ERROR.resetPassword.dateOfBirthMatch, false));
    }
  }, LOADER.page);
}

export function* getProductNameSaga(action) {
  yield* loader(function*() {
    const { locale, fallbackName } = action.payload;
    let response = yield call(getProductNameApi, locale);
    if (!response || !response.name || response.error) {
      // get default product name
      response = yield call(getProductNameApi, CONFIG.locales.ENGLISH);
    }
    const productName = response ? response.name : fallbackName;
    yield put(updateProductName(productName));
  }, LOADER.page);
}

export default function* resetPasswordSaga() {
  yield all([
    takeLeading(RESET_PASSWORD, resetPassword),
    takeLeading(VALIDATE_RESET_PASSWORD_REQUEST, validateResetPasswordRequest),
    takeLeading(GET_PRODUCT_NAME, getProductNameSaga),
  ]);
}
