import { createStore } from 'redux';

import moduleReducer from '../reducer';

jest.mock('../../modules/claims', () => ({
  claimReducer: jest.fn(() => ({})),
}));

jest.mock('../../modules/claims/make-claim', () => ({
  makeClaimReducer: jest.fn(() => ({})),
}));

jest.mock('../../modules/claims/claim-details', () => ({
  claimDetailsReducer: jest.fn(() => ({})),
}));

jest.mock('../../modules/doctors/clinic', () => ({
  clinicReducer: jest.fn(() => ({})),
}));

jest.mock('../../modules/loader', () => ({
  loaderReducer: jest.fn(() => ({})),
}));

jest.mock('../../modules/benefits/documents', () => ({
  usefulDocumentsReducer: jest.fn(() => ({})),
}));

jest.mock('../../modules/benefits/help', () => ({
  helpReducer: jest.fn(() => ({})),
}));

jest.mock('../../modules/lifestyle', () => ({
  lifestyleReducer: jest.fn(() => ({})),
}));

jest.mock('../../modules/lifestyle/general-tips', () => ({
  lifestyleTipsReducer: jest.fn(() => ({})),
}));

jest.mock('../../modules/lifestyle/lifestyle-results', () => ({
  lifestyleResultsReducer: jest.fn(() => ({})),
}));

jest.mock('../../modules/lifestyle/lifestyle-history', () => ({
  lifestyleHealthScoresHistoryReducer: jest.fn(() => ({})),
}));

jest.mock('../../modules/lifestyle/lifestyle-score', () => ({
  lifestyleScoreReducer: jest.fn(() => ({})),
}));

jest.mock('../../modules/error', () => ({
  errorReducer: jest.fn(() => ({})),
}));

jest.mock('../../modules/lifestyle/face-aging', () => ({
  faceAgingReducer: jest.fn(() => ({})),
}));

jest.mock('../../modules/lifestyle/questionnaire', () => ({
  questionnaireReducer: jest.fn(() => ({})),
}));

jest.mock('../../modules/me', () => ({
  profileReducer: jest.fn(() => ({})),
}));

jest.mock('../../modules/legal/privacy', () => ({
  privacyReducer: jest.fn(() => ({})),
}));

jest.mock('../../modules/legal/terms', () => ({
  termsReducer: jest.fn(() => ({})),
}));

jest.mock('../../modules/legal/newsletter', () => ({
  newsLetterReducer: jest.fn(() => ({})),
}));

describe('Reducer Module', () => {
  let combinedReducers;
  beforeEach(() => {
    const store = createStore(moduleReducer);
    combinedReducers = store.getState();
  });

  it('should contain the app reducers', () => {
    const expected = {
      activation: {
        verificationStatus: 'INITIAL',
      },
      claim: { claimDetails: {}, history: {}, makeClaim: {} },
      clinic: {},
      error: {},
      form: {},
      lifestyle: {
        faceAging: {},
        history: {},
        overview: {},
        results: {},
        tips: {},
        healthScore: {},
        questionnaire: {},
      },
      loader: {},
      me: {
        member: {},
        settings: {
          isRequestResetPasswordSuccess: false,
        },
      },
      payment: {
        instruments: [],
        isLoadingInstruments: true,
        isCheckingOut: false,
        isSubmittingPreAuth: false,
        paymentMethods: [],
        isLoadingPaymentMethods: true,
        isMakingPayment: false,
        purchasePaymentMethods: {},
      },
      legalContents: {
        privacyPolicy: {},
        termsConditions: {},
        newsLetter: {},
      },
      miscData: {
        contactInfo: {},
      },
      common: {
        recommendations: {
          details: [],
          suggestions: [],
        },
      },
      benefits: {
        documents: {},
        help: {},
        wallets: {
          isLoadingWallet: false,
          isWalletsDisabled: false,
          planYear: {},
          wallets: {},
        },
        benefitStatus: {
          hasOutpatient: false,
          hasWellness: false,
          hasEHealthCard: false,
          eHealthCardDetails: {},
          isClientUsingHase: false,
          cardTypeDetails: {},
          isClientGMM: false,
        },
      },
      accountActivation: {
        email: '',
        otpStatus: {},
      },
      resetPassword: {
        productName: '',
      },
    };

    expect(combinedReducers).toStrictEqual(expected);
  });
});
