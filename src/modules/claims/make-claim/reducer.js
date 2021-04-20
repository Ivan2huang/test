/* eslint-disable no-param-reassign */

import produce from 'immer';

import createReducer from '../../../helpers/reducer';
import {
  UPDATE_CLAIM_TYPES,
  UPDATE_PREVIEW_MODAL,
  UPDATE_TNC_MODAL,
  RESET_CLAIM_FORM,
  UPDATE_WALLET_BALANCE,
  UPDATE_TERM_AND_CONDITION,
} from './action';

const initialState = {
  categories: { all: [], byId: {} },
  types: { byId: {} },
  reasons: [],
  tncModal: false,
  walletBalance: {
    memberToWalletBalanceMap: {},
    memberToWalletBalanceTextMap: {},
    error: false,
  },
  termAndCondition: '',
};

const updateClaimTypes = produce((draft, action) => {
  const { categories, types, reasons } = action.payload;
  draft.categories = categories;
  draft.types = types;
  draft.reasons = reasons;
});

const updateTNCModal = produce((draft, action) => {
  const { tncModal } = action.payload;
  draft.tncModal = tncModal;
});

const updatePreviewModal = produce((draft, action) => {
  const { previewModal } = action.payload;
  draft.previewModal = previewModal;
});

const resetClaimForm = produce(draft => {
  draft.categories = initialState.categories;
  draft.types = initialState.types;
  draft.reasons = initialState.reasons;
});

const updateWalletBalance = produce((draft, action) => {
  const { walletBalanceData, error } = action.payload;
  if (walletBalanceData) {
    const {
      walletBalanceData: {
        memberToWalletBalanceMap,
        memberToWalletBalanceTextMap,
      },
    } = action.payload;
    if (memberToWalletBalanceMap) {
      draft.walletBalance.memberToWalletBalanceMap = memberToWalletBalanceMap;
      draft.walletBalance.memberToWalletBalanceTextMap = memberToWalletBalanceTextMap;
      draft.walletBalance.error = false;
    }
  } else {
    draft.walletBalance.error = error;
  }
});

const updateTermAndCondition = produce((draft, action) => {
  const { termAndCondition } = action.payload;
  draft.termAndCondition = termAndCondition;
});

const reducer = createReducer(initialState, {
  [UPDATE_CLAIM_TYPES]: updateClaimTypes,
  [UPDATE_TNC_MODAL]: updateTNCModal,
  [UPDATE_PREVIEW_MODAL]: updatePreviewModal,
  [RESET_CLAIM_FORM]: resetClaimForm,
  [UPDATE_WALLET_BALANCE]: updateWalletBalance,
  [UPDATE_TERM_AND_CONDITION]: updateTermAndCondition,
});

export default reducer;
