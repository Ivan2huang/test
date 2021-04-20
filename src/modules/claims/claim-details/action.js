import actionCreator from '../../../helpers/action';

export const GET_CLAIM_DETAILS = 'GET_CLAIM_DETAILS';
export const UPDATE_CLAIM_DETAILS = 'UPDATE_CLAIM_DETAILS';
export const CLEAR_CLAIM_DETAILS = 'CLEAR_CLAIM_DETAILS';

export const getNewClaimDetails = actionCreator(
  GET_CLAIM_DETAILS,
  'id',
  'claims',
);
export const updateNewClaimDetails = actionCreator(
  UPDATE_CLAIM_DETAILS,
  'claimDetails',
);
export const clearClaimDetails = actionCreator(CLEAR_CLAIM_DETAILS);
