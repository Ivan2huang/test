/* eslint-disable no-param-reassign */
import produce from 'immer';
import createReducer from '../../../helpers/reducer';
import { GET_WALLETS, UPDATE_WALLETS, DISABLE_WALLETS } from './action';

const initialState = {
  wallets: {},
  planYear: {},
  isLoadingWallet: false,
  isWalletsDisabled: false,
};

const getWallets = produce(draft => {
  draft.isLoadingWallet = true;
});

const updateWallets = produce((draft, action) => {
  return Object.assign({}, draft, action.payload, {
    isWalletsDisabled: false,
    isLoadingWallet: false,
  });
});

const disableWallets = produce(draft => {
  return Object.assign({}, draft, {
    isWalletsDisabled: true,
    isLoadingWallet: false,
  });
});

const reducer = createReducer(initialState, {
  [GET_WALLETS]: getWallets,
  [UPDATE_WALLETS]: updateWallets,
  [DISABLE_WALLETS]: disableWallets,
});

export default reducer;
