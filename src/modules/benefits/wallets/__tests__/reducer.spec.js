import reducer from '../reducer';

describe('Misc reducer', () => {
  it('should update get wallet data', () => {
    const initialState = {
      wallets: {},
      planYear: {},
      isLoadingWallet: false,
      isWalletsDisabled: false,
    };

    const action = {
      type: 'GET_WALLETS',
      payload: {},
    };
    const expected = {
      ...initialState,
      isLoadingWallet: true,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update wallets data', () => {
    const initialState = {
      wallets: {},
      planYear: {},
      isLoadingWallet: true,
      isWalletsDisabled: false,
    };

    const action = {
      type: 'UPDATE_WALLETS',
      payload: { wallets: { name: 'wallet' }, planYear: { name: 'plan1' } },
    };
    const expected = {
      ...initialState,
      isLoadingWallet: false,
      wallets: { name: 'wallet' },
      planYear: { name: 'plan1' },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update disable wallet', () => {
    const initialState = {
      wallets: {},
      planYear: {},
      isLoadingWallet: true,
      isWalletsDisabled: false,
    };

    const action = {
      type: 'DISABLE_WALLETS',
      payload: {},
    };
    const expected = {
      ...initialState,
      isLoadingWallet: false,
      isWalletsDisabled: true,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });
});
