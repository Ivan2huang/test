import { all, call, takeLeading, put } from 'redux-saga/effects';

import { FORGOT_PASSWORD } from './action';
import { forgotPassword as forgotPasswordApi } from './api';
import { loader } from '../../loader';
import LOADER from '../../../constants/loader';
import { navigateTo } from '../../../helpers/helpers';
import paths from '../../../helpers/paths';
import ERROR from '../../../constants/error';
import { updateError } from '../../error/action';

export function* forgotPassword(action) {
  yield* loader(function*() {
    const { email, verify } = action.payload;
    const response = yield call(forgotPasswordApi, email, verify);

    if (response && response.error) {
      if (response.messageKey === 'AccountLocked') {
        yield put(
          updateError(ERROR.resetPassword.accountLocked, response.message),
        );
        yield call(navigateTo, paths.common.resetPasswordAccountLocked);
      } else {
        yield call(navigateTo, paths.common.error);
      }
    } else {
      yield call(navigateTo, paths.common.forgotPasswordSuccess, {
        email,
        verify,
      });
    }
  }, LOADER.page);
}

export default function* forgotPasswordSaga() {
  yield all([takeLeading(FORGOT_PASSWORD, forgotPassword)]);
}
