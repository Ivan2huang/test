import reducer from '../reducer';

jest.mock('../action', () => ({
  UPDATE_CLAIM_TYPES: 'UPDATE_CLAIM_TYPES',
  UPDATE_TNC_MODAL: 'UPDATE_TNC_MODAL',
  RESET_CLAIM_FORM: 'RESET_CLAIM_FORM',
  UPDATE_WALLET_BALANCE: 'UPDATE_WALLET_BALANCE',
  UPDATE_PREVIEW_MODAL: 'UPDATE_PREVIEW_MODAL',
  UPDATE_TERM_AND_CONDITION: 'UPDATE_TERM_AND_CONDITION',
}));

describe('Claim Reducer', () => {
  it('should update the claim types', () => {
    const initialState = {};
    const action = {
      type: 'UPDATE_CLAIM_TYPES',
      payload: {
        categories: {
          all: [1],
          byId: {
            1: {
              id: 1,
              code: 'outpatient',
            },
          },
        },
        types: {
          byId: {
            10: {
              id: 10,
              code: 'MO-GP',
            },
          },
        },
        reasons: {
          byId: {
            100: {
              id: 100,
              code: 'COLIC',
            },
          },
        },
      },
    };
    const expected = {
      categories: {
        all: [1],
        byId: {
          1: {
            id: 1,
            code: 'outpatient',
          },
        },
      },
      types: {
        byId: {
          10: {
            id: 10,
            code: 'MO-GP',
          },
        },
      },
      reasons: {
        byId: {
          100: {
            id: 100,
            code: 'COLIC',
          },
        },
      },
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should update the TNC modal state', () => {
    const initialState = {
      tncModal: false,
    };
    const action = {
      type: 'UPDATE_TNC_MODAL',
      payload: {
        tncModal: true,
      },
    };
    const expected = {
      tncModal: true,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update the preview modal state', () => {
    const initialState = {
      previewModal: false,
    };
    const action = {
      type: 'UPDATE_PREVIEW_MODAL',
      payload: {
        previewModal: true,
      },
    };
    const expected = {
      previewModal: true,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should reset the claim form', () => {
    const initialState = {
      categories: {
        all: [1],
        byId: {
          1: {
            id: 1,
            code: 'outpatient',
          },
        },
      },
      types: {
        byId: {
          10: {
            id: 10,
            code: 'MO-GP',
          },
        },
      },
      reasons: {
        byId: {
          100: {
            id: 100,
            code: 'COLIC',
          },
        },
      },
      tncModal: false,
    };
    const action = {
      type: 'RESET_CLAIM_FORM',
      payload: {},
    };

    const expected = {
      categories: { all: [], byId: {} },
      types: { byId: {} },
      reasons: [],
      tncModal: false,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update the wallet balance for selected member wallet balance', () => {
    const memberToWalletBalanceMap = { '1': 200 };
    const memberToWalletBalanceTextMap = { '1': 'HK$200' };
    const initialState = {
      walletBalance: {
        memberToWalletBalanceMap: {},
        memberToWalletBalanceTextMap: {},
        error: false,
      },
    };
    const action = {
      type: 'UPDATE_WALLET_BALANCE',
      payload: {
        walletBalanceData: {
          memberToWalletBalanceMap,
          memberToWalletBalanceTextMap,
        },
      },
    };
    const expected = {
      walletBalance: {
        memberToWalletBalanceMap,
        memberToWalletBalanceTextMap,
        error: false,
      },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update the wallet balance error', () => {
    const initialState = {
      walletBalance: {
        memberToWalletBalanceMap: {},
        memberToWalletBalanceTextMap: {},
        error: false,
      },
    };
    const action = {
      type: 'UPDATE_WALLET_BALANCE',
      payload: {
        walletBalanceData: undefined,
        error: true,
      },
    };
    const expected = {
      walletBalance: {
        memberToWalletBalanceMap: {},
        memberToWalletBalanceTextMap: {},
        error: true,
      },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update the wallet balance error to false when  on balance refresh  get successful response', () => {
    const memberToWalletBalanceMap = { '1': 200 };
    const memberToWalletBalanceTextMap = { '1': 'HK$200' };
    const initialState = {
      walletBalance: {
        memberToWalletBalanceMap: {},
        memberToWalletBalanceTextMap: {},
        error: true,
      },
    };
    const action = {
      type: 'UPDATE_WALLET_BALANCE',
      payload: {
        walletBalanceData: {
          memberToWalletBalanceMap,
          memberToWalletBalanceTextMap,
        },
      },
    };
    const expected = {
      walletBalance: {
        memberToWalletBalanceMap,
        memberToWalletBalanceTextMap,
        error: false,
      },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update term and condition', () => {
    const initialState = {
      termAndCondition: {},
    };
    const action = {
      type: 'UPDATE_TERM_AND_CONDITION',
      payload: {
        termAndCondition: {
          en: 'eng',
        },
      },
    };
    const expected = {
      termAndCondition: {
        en: 'eng',
      },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });
});
