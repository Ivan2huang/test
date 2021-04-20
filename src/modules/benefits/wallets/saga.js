import { all, call, put, takeLeading } from 'redux-saga/effects';
import isNumber from 'lodash/isNumber';

import { GET_WALLETS, updateWallets, disableWallets } from './action';
import { getWallets, getCurrentPlanYear } from './api';
import LOADER from '../../../constants/loader';
import { loader } from '../../loader';
import { BALANCE_NOT_FOUND, ACCOUNT_NOT_FOUND } from './constant';

export function* getWalletsSaga(action) {
  yield* loader(function*() {
    const disabledErrors = [BALANCE_NOT_FOUND, ACCOUNT_NOT_FOUND];
    const { includeDependents } = action.payload;
    const [wallets, planYear] = yield all([
      call(getWallets, includeDependents),
      call(getCurrentPlanYear),
    ]);

    if (wallets.error) {
      if (disabledErrors.includes(wallets.messageKey)) {
        yield put(disableWallets());
      } else {
        yield put(updateWallets({}, {}));
      }
    } else {
      const { member = {}, dependents = [] } = wallets;
      const hasValidData = [member, ...dependents].every(wallet =>
        isNumber(wallet.balance),
      );
      if (!hasValidData) {
        yield put(disableWallets());
      } else {
        yield put(updateWallets(wallets, planYear));
      }
    }
  }, LOADER.page);
}

export default function* walletSaga() {
  yield all([takeLeading(GET_WALLETS, getWalletsSaga)]);
}
