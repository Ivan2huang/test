/* eslint-disable no-param-reassign */

import produce from 'immer';

import createReducer from '../../helpers/reducer';
import {
  UPDATE_APPROVED_REJECTED_CLAIMS,
  UPDATE_PENDING_CLAIMS,
  UPDATE_APPLIED_FILTERS,
} from './action';

const initialState = {
  pendingClaims: [],
  approvedRejectedClaims: [],
  appliedFilters: {},
};

const updatePendingClaims = produce((draft, actions) => {
  const { pendingClaims } = actions.payload;
  draft.pendingClaims = pendingClaims;
});

const updateApprovedRejectedClaims = produce((draft, actions) => {
  const { approvedRejectedClaims } = actions.payload;
  draft.approvedRejectedClaims = approvedRejectedClaims;
});

const updateAppliedFilters = produce((draft, action) => {
  const { appliedFilters } = action.payload;
  draft.appliedFilters = appliedFilters;
});

const reducer = createReducer(initialState, {
  [UPDATE_PENDING_CLAIMS]: updatePendingClaims,
  [UPDATE_APPROVED_REJECTED_CLAIMS]: updateApprovedRejectedClaims,
  [UPDATE_APPLIED_FILTERS]: updateAppliedFilters,
});

export default reducer;
