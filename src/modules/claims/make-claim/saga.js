import {
  all,
  call,
  put,
  takeLatest,
  takeLeading,
  take,
  select,
} from 'redux-saga/effects';
import { reset } from 'redux-form';

import {
  getClaimTypes,
  getWalletBalance,
  submitClaim,
  uploadDocument,
} from './api';
import { navigateTo } from '../../../helpers/helpers';
import paths from '../../../helpers/paths';
import {
  GET_CLAIM_TYPES,
  SUBMIT_CLAIM,
  UPDATE_TNC_ACTION,
  resetClaimForm,
  updateTNCModal,
  GET_WALLET_BALANCE,
  updateWalletBalance,
  updateClaimTypes,
  GET_TERM_AND_CONDITION,
  updateTermAndCondition,
} from './action';
import { loader } from '../../loader';
import LOADER from '../../../constants/loader';
import CONFIG from '../../../constants/config';
import { CLAIM_DOCUMENT_TYPES } from '../constant';
import { makeClaimSelector } from './selector';
import { getTermsConditions } from '../../legal/terms/api';

export function* getClaimTypesSaga() {
  yield* loader(function*() {
    const { categories, types, reasons } = yield call(getClaimTypes);
    yield put(updateClaimTypes(categories, types, reasons));
  }, LOADER.page);
}

export function* submitClaimSaga(action) {
  yield put(updateTNCModal(true));
  const { payload } = yield take(UPDATE_TNC_ACTION);
  if (!payload.tncAction) return;

  const { loaderMessage } = action.payload;
  yield* loader(
    function*() {
      const { claimData } = action.payload;
      const receiptFileIds = yield all(
        claimData.receipts.files.map(document =>
          call(uploadDocument, CLAIM_DOCUMENT_TYPES.receipt, document),
        ),
      );
      if (receiptFileIds.includes('Error')) {
        return;
      }

      let referralFileIds = [];
      if (claimData.referralRequired) {
        referralFileIds = yield all(
          claimData.referral.files.map(document =>
            call(uploadDocument, CLAIM_DOCUMENT_TYPES.referral, document),
          ),
        );

        if (referralFileIds.includes('Error')) {
          return;
        }
      }

      let settlementAdvicesFileIds = [];
      if (claimData.anotherInsurerEnabled) {
        settlementAdvicesFileIds = yield all(
          claimData.settlementAdvices.files.map(document =>
            call(
              uploadDocument,
              CLAIM_DOCUMENT_TYPES.settlementAdvices,
              document,
            ),
          ),
        );

        if (settlementAdvicesFileIds.includes('Error')) {
          return;
        }
      }

      let prescriptionsFileIds = [];
      if (claimData.isChineseHerbalist) {
        prescriptionsFileIds = yield all(
          claimData.prescriptions.files.map(document =>
            call(uploadDocument, CLAIM_DOCUMENT_TYPES.prescriptions, document),
          ),
        );

        if (prescriptionsFileIds.includes('Error')) {
          return;
        }
      }

      const formValues = {
        ...claimData,
        receiptFileIds,
        referralFileIds,
        settlementAdvicesFileIds,
        prescriptionsFileIds,
      };
      const claimType = yield select(makeClaimSelector);
      const { error } = yield call(submitClaim, formValues, claimType);
      if (error) {
        return;
      }
      yield call(navigateTo, paths.common.claimSuccess);
      yield put(resetClaimForm());
      yield put(reset('make-claim'));
    },
    LOADER.page,
    loaderMessage,
  );
}

export function* getWalletBalanceSaga() {
  yield* loader(function*() {
    const walletBalanceResponse = yield call(getWalletBalance);
    if (walletBalanceResponse.error) {
      yield put(updateWalletBalance(undefined, true));
      return;
    }
    yield put(updateWalletBalance(walletBalanceResponse));
  }, LOADER.walletBalance);
}

export function* getTermAndConditionSaga() {
  yield* loader(function*() {
    const apiCalls = [];
    const saveResponses = {};
    const locales = [CONFIG.locales.ENGLISH, CONFIG.locales.CHINESE];
    locales.forEach(locale => apiCalls.push(call(getTermsConditions, locale)));
    const responses = yield all(apiCalls);

    if (responses.length > 1) {
      locales.forEach((locale, index) => {
        saveResponses[locale] = responses[index];
      });
    }

    yield put(updateTermAndCondition(saveResponses));
  }, LOADER.page);
}

export default function* claimSaga() {
  yield all([
    takeLatest(GET_CLAIM_TYPES, getClaimTypesSaga),
    takeLeading(SUBMIT_CLAIM, submitClaimSaga),
    takeLatest(GET_WALLET_BALANCE, getWalletBalanceSaga),
    takeLeading(GET_TERM_AND_CONDITION, getTermAndConditionSaga),
  ]);
}
