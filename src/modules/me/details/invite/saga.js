import { call, takeLeading, put } from 'redux-saga/effects';
import { reset } from 'redux-form';
import {
  inviteDependent as inviteDependentApi,
  updateDependentProfile as updateDependentProfileApi,
} from './api';
import { INVITE_DEPENDENT } from './action';
import { navigateTo } from '../../../../helpers/helpers';
import paths from '../../../../helpers/paths';
import { loader } from '../../../loader';
import { updateError } from '../../../error/action';
import LOADER from '../../../../constants/loader';
import ERROR from '../../../../constants/error';

export function* getInviteDependentSaga(action) {
  const { loaderMessage } = action.payload;
  yield* loader(
    function*() {
      const {
        dependentData: {
          dependentEmail,
          dependentId,
          dependentName,
          hasDefaultDateOfBirth,
          dateOfBirth,
        },
      } = action.payload;

      yield put(updateError(ERROR.inviteDependent.emailAlreadyTaken, false));

      if (!hasDefaultDateOfBirth) {
        const updateResponse = yield call(
          updateDependentProfileApi,
          dependentId,
          dateOfBirth,
        );
        if (updateResponse && updateResponse.error) {
          yield call(navigateTo, paths.common.error);
          return;
        }
      }

      const inviteResponse = yield call(
        inviteDependentApi,
        dependentEmail,
        dependentId,
      );
      if (inviteResponse && inviteResponse.error) {
        if (inviteResponse.messageKey === 'EmailAlreadyTaken') {
          yield put(updateError(ERROR.inviteDependent.emailAlreadyTaken, true));
        } else {
          yield call(navigateTo, paths.common.error);
        }
      } else {
        yield call(navigateTo, paths.employee.inviteDependentSuccess, {
          dependentEmail,
          dependentName,
        });
        yield put(reset('inviteDependent'));
      }
    },
    LOADER.page,
    loaderMessage,
  );
}

export default function* inviteDependentSaga() {
  yield takeLeading(INVITE_DEPENDENT, getInviteDependentSaga);
}
