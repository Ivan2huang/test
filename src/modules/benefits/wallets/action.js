import actionCreator from '../../../helpers/action';

export const GET_WALLETS = 'GET_WALLETS';
export const UPDATE_WALLETS = 'UPDATE_WALLETS';
export const DISABLE_WALLETS = 'DISABLE_WALLETS';

export const getWallets = actionCreator(GET_WALLETS, 'includeDependents');
export const updateWallets = actionCreator(
  UPDATE_WALLETS,
  'wallets',
  'planYear',
);
export const disableWallets = actionCreator(DISABLE_WALLETS);
