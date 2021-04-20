import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_CLAIMS,
  FILTER_CLAIMS,
  updateApprovedRejectedClaims,
  updatePendingClaims,
  updateAppliedFilters,
} from './action';

import { loader } from '../loader';
import LOADER from '../../constants/loader';
import { getClaims, filterClaims } from './api';

export function* getClaimsSaga() {
  yield* loader(function*() {
    const [pendingClaims, approvedAndRejectedClaims] = yield call(getClaims);
    yield all([
      put(updatePendingClaims(pendingClaims)),
      put(updateApprovedRejectedClaims(approvedAndRejectedClaims)),
    ]);
  }, LOADER.page);
}

export function* filterClaimsSaga(action) {
  yield* loader(function*() {
    const { filters } = action.payload;
    const filterParams = Object.keys(filters).reduce((result, filterKey) => {
      const filterValues = filters[filterKey];
      const checkedValues = Object.keys(filterValues).reduce(
        (checkedValuesResult, checkedValueKey) => {
          if (filterValues[checkedValueKey]) {
            checkedValuesResult.push(checkedValueKey);
          }
          return checkedValuesResult;
        },
        [],
      );

      return {
        ...result,
        [filterKey]: checkedValues.join(','),
      };
    }, {});
    const [pendingClaims, approvedAndRejectedClaims] = yield call(
      filterClaims,
      filterParams,
    );
    yield all([
      put(updatePendingClaims(pendingClaims)),
      put(updateApprovedRejectedClaims(approvedAndRejectedClaims)),
      put(updateAppliedFilters(filters)),
    ]);
  }, LOADER.page);
}

export default function* claimSaga() {
  yield all([
    takeLatest(GET_CLAIMS, getClaimsSaga),
    takeLatest(FILTER_CLAIMS, filterClaimsSaga),
  ]);
}
