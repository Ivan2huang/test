import {
  getClaimTypes,
  submitClaim,
  updateClaimTypes,
  updateTNCAction,
  updateTNCModal,
  resetClaimForm,
  getWalletBalance,
  updateWalletBalance,
  getTermAndCondition,
  updateTermAndCondition,
} from '../action';

describe('Make Claim Action', () => {
  it('should create get claim types action', () => {
    const expected = {
      type: 'GET_CLAIM_TYPES',
      payload: {},
    };

    const actual = getClaimTypes();

    expect(actual).toEqual(expected);
  });

  it('should create update claim types action', () => {
    const payload = {
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
    const expected = {
      type: 'UPDATE_CLAIM_TYPES',
      payload,
    };

    const actual = updateClaimTypes(
      payload.categories,
      payload.types,
      payload.reasons,
    );

    expect(actual).toEqual(expected);
  });

  it('should create submit claim action', () => {
    const expected = {
      type: 'SUBMIT_CLAIM',
      payload: { claimData: {}, loaderMessage: 'loading...' },
    };

    const actual = submitClaim({}, 'loading...');

    expect(actual).toEqual(expected);
  });

  it('should create update TNC Action', () => {
    const expected = {
      type: 'UPDATE_TNC_ACTION',
      payload: {
        tncAction: true,
      },
    };

    const actual = updateTNCAction(true);

    expect(actual).toEqual(expected);
  });

  it('should create update TNC Modal', () => {
    const expected = {
      type: 'UPDATE_TNC_MODAL',
      payload: {
        tncModal: true,
      },
    };

    const actual = updateTNCModal(true);

    expect(actual).toEqual(expected);
  });

  it('should reset claim form', () => {
    const expected = {
      type: 'RESET_CLAIM_FORM',
      payload: {},
    };

    const actual = resetClaimForm();

    expect(actual).toEqual(expected);
  });

  it('should create update wallet balance action', () => {
    const memberToWalletBalanceMap = {
      '1': 200,
    };
    const memberToWalletBalanceTextMap = {
      '1': 'HK$200',
    };
    const expected = {
      type: 'UPDATE_WALLET_BALANCE',
      payload: {
        error: undefined,
        walletBalanceData: {
          memberToWalletBalanceMap,
          memberToWalletBalanceTextMap,
        },
      },
    };

    const actual = updateWalletBalance({
      memberToWalletBalanceMap,
      memberToWalletBalanceTextMap,
    });

    expect(actual).toEqual(expected);
  });

  it('should create update wallet balance action for error', () => {
    const expected = {
      type: 'UPDATE_WALLET_BALANCE',
      payload: {
        error: true,
      },
    };

    const actual = updateWalletBalance(undefined, true);

    expect(actual).toEqual(expected);
  });

  it('should create get wallet balance action', () => {
    const expected = {
      type: 'GET_WALLET_BALANCE',
      payload: {},
    };

    const actual = getWalletBalance();

    expect(actual).toEqual(expected);
  });

  it('should create get term and condition action', () => {
    const expected = {
      type: 'GET_TERM_AND_CONDITION',
      payload: {},
    };

    const actual = getTermAndCondition();

    expect(actual).toEqual(expected);
  });

  it('should create update term and condition action', () => {
    const expected = {
      type: 'UPDATE_TERM_AND_CONDITION',
      payload: {
        termAndCondition: {
          en: 'eng',
        },
      },
    };

    const actual = updateTermAndCondition({
      en: 'eng',
    });

    expect(actual).toEqual(expected);
  });
});
