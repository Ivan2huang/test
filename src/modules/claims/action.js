import actionCreator from '../../helpers/action';

export const GET_CLAIMS = 'GET_CLAIMS';
export const UPDATE_PENDING_CLAIMS = 'UPDATE_PENDING_CLAIMS';
export const UPDATE_APPROVED_REJECTED_CLAIMS =
  'UPDATE_APPROVED_REJECTED_CLAIMS';
export const FILTER_CLAIMS = 'FILTER_CLAIMS';
export const UPDATE_APPLIED_FILTERS = 'UPDATE_APPLIED_FILTERS';

export const getClaims = actionCreator(GET_CLAIMS);
export const updatePendingClaims = actionCreator(
  UPDATE_PENDING_CLAIMS,
  'pendingClaims',
);
export const updateApprovedRejectedClaims = actionCreator(
  UPDATE_APPROVED_REJECTED_CLAIMS,
  'approvedRejectedClaims',
);

export const filterClaims = actionCreator(FILTER_CLAIMS, 'filters');

export const updateAppliedFilters = actionCreator(
  UPDATE_APPLIED_FILTERS,
  'appliedFilters',
);
