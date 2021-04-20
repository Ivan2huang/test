import actionCreator from '../../../helpers/action';

export const GET_USER_PROFILE = 'GET_USER_PROFILE';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const GET_CLAIM_TYPES = 'GET_CLAIM_TYPES';
export const UPDATE_CLAIM_TYPES = 'UPDATE_CLAIM_TYPES';
export const SUBMIT_CLAIM = 'SUBMIT_CLAIM';
export const UPDATE_PLAN_YEARS = 'UPDATE_PLAN_YEARS';
export const UPDATE_TNC_ACTION = 'UPDATE_TNC_ACTION';
export const UPDATE_TNC_MODAL = 'UPDATE_TNC_MODAL';
export const UPDATE_PREVIEW_MODAL = 'UPDATE_PREVIEW_MODAL';
export const RESET_CLAIM_FORM = 'RESET_CLAIM_FORM';
export const GET_WALLET_BALANCE = 'GET_WALLET_BALANCE';
export const UPDATE_WALLET_BALANCE = 'UPDATE_WALLET_BALANCE';
export const GET_TERM_AND_CONDITION = 'GET_TERM_AND_CONDITION';
export const UPDATE_TERM_AND_CONDITION = 'UPDATE_TERM_AND_CONDITION';

export const getClaimTypes = actionCreator(GET_CLAIM_TYPES);
export const updateClaimTypes = actionCreator(
  UPDATE_CLAIM_TYPES,
  'categories',
  'types',
  'reasons',
);

export const submitClaim = actionCreator(
  SUBMIT_CLAIM,
  'claimData',
  'loaderMessage',
);

export const getWalletBalance = actionCreator(GET_WALLET_BALANCE);

export const updateWalletBalance = actionCreator(
  UPDATE_WALLET_BALANCE,
  'walletBalanceData',
  'error',
);

export const updatePreviewModal = actionCreator(
  UPDATE_PREVIEW_MODAL,
  'previewModal',
);

export const updateTNCAction = actionCreator(UPDATE_TNC_ACTION, 'tncAction');

export const updateTNCModal = actionCreator(UPDATE_TNC_MODAL, 'tncModal');

export const resetClaimForm = actionCreator(RESET_CLAIM_FORM);

export const getTermAndCondition = actionCreator(GET_TERM_AND_CONDITION);

export const updateTermAndCondition = actionCreator(
  UPDATE_TERM_AND_CONDITION,
  'termAndCondition',
);
