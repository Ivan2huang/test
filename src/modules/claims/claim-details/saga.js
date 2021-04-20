import { takeLatest, call, put, all } from 'redux-saga/effects';

import getClaimDetails from './api';
import { loader } from '../../loader';
import LOADER from '../../../constants/loader';
import {
  GET_CLAIM_DETAILS,
  updateNewClaimDetails,
  clearClaimDetails,
} from './action';

import { getClaims } from '../api';

export function* getClaimDetailsSaga(action) {
  yield* loader(function*() {
    const { id, claims } = action.payload;
    yield put(clearClaimDetails());
    /**
     * FIXME: should remove get claims list after BE fixed API problems
     */
    let response = {};
    let claimsList = [...claims];
    if (!claims.length) {
      const [
        responseAll,
        [pendingClaims, approvedAndRejectedClaims],
      ] = yield all([call(getClaimDetails, id), call(getClaims)]);
      claimsList = [...pendingClaims, ...approvedAndRejectedClaims];
      response = responseAll;
    } else {
      response = yield call(getClaimDetails, id);
    }
    const claimDetail = claimsList.find(c => c.id === id);
    if (claimDetail) {
      response.claimantId = claimDetail.patientId;
    }
    yield put(updateNewClaimDetails(response));
  }, LOADER.page);
}

export default function* claimDetails() {
  yield takeLatest(GET_CLAIM_DETAILS, getClaimDetailsSaga);
}
