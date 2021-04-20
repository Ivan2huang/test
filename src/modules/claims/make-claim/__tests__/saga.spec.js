import {
  all,
  call,
  put,
  takeLatest,
  takeLeading,
  take,
  select,
} from 'redux-saga/effects';
import { reset } from 'redux-form';

import { navigateTo } from '../../../../helpers/helpers';
import claimSaga, {
  getClaimTypesSaga,
  getWalletBalanceSaga,
  getTermAndConditionSaga,
  submitClaimSaga,
} from '../saga';
import { makeClaimSelector } from '../selector';

import {
  GET_CLAIM_TYPES,
  SUBMIT_CLAIM,
  UPDATE_TNC_ACTION,
  resetClaimForm,
  updateClaimTypes,
  updateTNCModal,
  GET_WALLET_BALANCE,
  updateWalletBalance,
  GET_TERM_AND_CONDITION,
  updateTermAndCondition,
} from '../action';
import {
  getClaimTypes,
  getWalletBalance,
  submitClaim,
  uploadDocument,
} from '../api';
import paths from '../../../../helpers/paths';
import { getTermsConditions } from '../../../legal/terms/api';

// import { getCookie } from '../../../../helpers/auth';

jest.mock('../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
}));

jest.mock('../../../legal/terms/api', () => ({
  getTermsConditions: jest.fn(),
}));

jest.mock('../api', () => ({
  getClaimFields: jest.fn(),
  getClaimItems: jest.fn(),
  getClaimTypes: jest.fn(),
  getUserProfile: jest.fn(),
  getWalletBalance: jest.fn(),
  submitClaim: jest.fn(),
  uploadDocument: jest.fn(),
}));

jest.mock('../../../loader', () => ({
  *loader(task, id, message) {
    yield ['START_LOADER', id, message];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

jest.mock('../selector', () => ({
  makeClaimSelector: jest.fn(),
}));

describe('MakeClaim Saga', () => {
  it('should watch actions', () => {
    const generator = claimSaga();

    const next = generator.next();

    expect(next.value).toEqual(
      all([
        takeLatest(GET_CLAIM_TYPES, getClaimTypesSaga),
        takeLeading(SUBMIT_CLAIM, submitClaimSaga),
        takeLatest(GET_WALLET_BALANCE, getWalletBalanceSaga),
        takeLeading(GET_TERM_AND_CONDITION, getTermAndConditionSaga),
      ]),
    );
  });

  it('should get and update claim types', () => {
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

    const generator = getClaimTypesSaga();
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page', undefined]);
    next = generator.next();
    expect(next.value).toEqual(call(getClaimTypes));
    next = generator.next(payload);
    expect(next.value).toEqual(
      put(updateClaimTypes(payload.categories, payload.types, payload.reasons)),
    );
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle the success submit of the claim', () => {
    const action = {
      type: SUBMIT_CLAIM,
      payload: {
        claimData: {
          patientId: '12',
          contactNumber: '12345678',
          claimId: 'MO-GP',
          diagnosis: 'Abdominal Pain',
          consultationDate: '',
          claimType: 'General Medical Practitioner',
          receiptAmount: '1234',
          receipts: { files: [{ name: 'xyz.png', size: 1123 }] },
          referral: { files: [{ name: 'referral.png', size: 1234 }] },
          prescriptions: { files: [{ name: 'pre.png', size: 1123 }] },
          settlementAdvices: { files: [{ name: 'sett.png', size: 1123 }] },
          referralRequired: true,
          anotherInsurerEnabled: true,
          isChineseHerbalist: true,
        },
        loaderMessage: 'loading...',
      },
    };
    const claimPostBody = {
      patientId: '12',
      contactNumber: '12345678',
      claimId: 'MO-GP',
      diagnosis: 'Abdominal Pain',
      consultationDate: '',
      claimType: 'General Medical Practitioner',
      receiptAmount: '1234',
      receipts: { files: [{ name: 'xyz.png', size: 1123 }] },
      referral: { files: [{ name: 'referral.png', size: 1234 }] },
      prescriptions: { files: [{ name: 'pre.png', size: 1123 }] },
      settlementAdvices: { files: [{ name: 'sett.png', size: 1123 }] },
      referralRequired: true,
      receiptFileIds: [123],
      referralFileIds: [1234],
      prescriptionsFileIds: [111],
      settlementAdvicesFileIds: [112],
      anotherInsurerEnabled: true,
      isChineseHerbalist: true,
    };
    const submitPayload = {
      claimObjectId: 10369,
      message: 'Claim has been submitted successfully!',
      claimId: 'C-GP5-669',
    };
    const uploadFilePayload = [123];
    const uploadReferralPayload = [1234];
    const uploadsettlementAdvicesPayload = [112];
    const uploadPrescriptionPayload = [111];
    const updateTNCActionPayload = {
      type: 'UPDATE_TNC_ACTION',
      payload: {
        tncAction: true,
      },
    };
    const makeClaimState = {
      categories: {},
      types: {},
      reasons: {},
    };

    const generator = submitClaimSaga(action);
    let next = generator.next();
    expect(next.value).toEqual(put(updateTNCModal(true)));
    next = generator.next();
    expect(next.value).toEqual(take(UPDATE_TNC_ACTION));
    next = generator.next(updateTNCActionPayload);
    expect(next.value).toStrictEqual(['START_LOADER', 'page', 'loading...']);
    next = generator.next();
    expect(next.value).toEqual(
      all([call(uploadDocument, 'Receipt', { name: 'xyz.png', size: 1123 })]),
    );
    next = generator.next(uploadFilePayload);
    expect(next.value).toEqual(
      all([
        call(uploadDocument, 'Referral', { name: 'referral.png', size: 1234 }),
      ]),
    );
    next = generator.next(uploadReferralPayload);
    expect(next.value).toEqual(
      all([
        call(uploadDocument, 'SettlementAdvices', {
          name: 'sett.png',
          size: 1123,
        }),
      ]),
    );
    next = generator.next(uploadsettlementAdvicesPayload);
    expect(next.value).toEqual(
      all([
        call(uploadDocument, 'Prescriptions', { name: 'pre.png', size: 1123 }),
      ]),
    );
    next = generator.next(uploadPrescriptionPayload);
    expect(next.value).toEqual(select(makeClaimSelector));
    next = generator.next(makeClaimState);
    expect(next.value).toEqual(
      call(submitClaim, claimPostBody, makeClaimState),
    );
    next = generator.next(submitPayload);
    expect(next.value).toEqual(call(navigateTo, paths.common.claimSuccess));
    next = generator.next();
    expect(next.value).toEqual(put(resetClaimForm()));
    next = generator.next();
    expect(next.value).toEqual(put(reset('make-claim')));
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle the success get wallet balance', () => {
    const walletBalancePayloadMap = {};
    walletBalancePayloadMap['3'] = 123;
    walletBalancePayloadMap['2'] = 124;

    const generator = getWalletBalanceSaga();

    let next = generator.next();

    expect(next.value).toStrictEqual([
      'START_LOADER',
      'walletBalance',
      undefined,
    ]);

    next = generator.next();

    expect(next.value).toEqual(call(getWalletBalance));

    next = generator.next(walletBalancePayloadMap);

    expect(next.value).toEqual(
      put(updateWalletBalance(walletBalancePayloadMap)),
    );

    next = generator.next();

    expect(next.value).toBe('STOP_LOADER');

    next = generator.next();

    expect(next.value).toBe(undefined);
    expect(next.done).toBe(true);
  });

  it('should handle submit claim error scenario', () => {
    const action = {
      type: SUBMIT_CLAIM,
      payload: {
        claimData: {
          patientId: '12',
          contactNumber: '12345678',
          claimId: 'MO-GP',
          diagnosis: 'Abdominal Pain',
          consultationDate: '',
          claimType: 'General Medical Practitioner',
          receiptAmount: '1234',
          receipts: { files: [{ name: 'xyz.png', size: 1123 }] },
          referralRequired: false,
        },
        loaderMessage: 'loading...',
      },
    };
    const claimPostBody = {
      patientId: '12',
      contactNumber: '12345678',
      claimId: 'MO-GP',
      diagnosis: 'Abdominal Pain',
      consultationDate: '',
      claimType: 'General Medical Practitioner',
      receiptAmount: '1234',
      receipts: { files: [{ name: 'xyz.png', size: 1123 }] },
      referralRequired: false,
      receiptFileIds: [2578],
      referralFileIds: [],
      prescriptionsFileIds: [],
      settlementAdvicesFileIds: [],
    };
    const submitResponse = {
      error: true,
      messageKey: 404,
      message: 'Error',
    };
    const uploadFilePayload = [2578];
    const updateTNCActionPayload = {
      type: 'UPDATE_TNC_ACTION',
      payload: {
        tncAction: true,
      },
    };
    const makeClaimState = {
      categories: {},
      types: {},
      reasons: {},
    };

    const generator = submitClaimSaga(action);
    generator.next();
    generator.next();
    let next = generator.next(updateTNCActionPayload);
    expect(next.value).toStrictEqual(['START_LOADER', 'page', 'loading...']);
    next = generator.next();
    expect(next.value).toEqual(
      all([call(uploadDocument, 'Receipt', { name: 'xyz.png', size: 1123 })]),
    );
    next = generator.next(uploadFilePayload);
    expect(next.value).toEqual(select(makeClaimSelector));
    next = generator.next(makeClaimState);
    expect(next.value).toEqual(
      call(submitClaim, claimPostBody, makeClaimState),
    );
    next = generator.next(submitResponse);
    expect(next.value).toBe('STOP_LOADER');
    next = generator.next();
    expect(next.done).toEqual(true);
  });

  it('should handle submit claim error scenario when receipt file submission fails', () => {
    const action = {
      type: SUBMIT_CLAIM,
      payload: {
        claimData: {
          patientId: '12',
          contactNumber: '12345678',
          claimId: 'MO-GP',
          diagnosis: 'Abdominal Pain',
          consultationDate: '',
          claimType: 'General Medical Practitioner',
          receiptAmount: '1234',
          receipts: { files: [{ name: 'xyz.png', size: 1123 }] },
        },
        loaderMessage: 'loading...',
      },
    };
    const updateTNCActionPayload = {
      type: 'UPDATE_TNC_ACTION',
      payload: {
        tncAction: true,
      },
    };
    const uploadFilePayload = ['Error'];

    const generator = submitClaimSaga(action);
    generator.next();
    generator.next();
    let next = generator.next(updateTNCActionPayload);
    expect(next.value).toStrictEqual(['START_LOADER', 'page', 'loading...']);
    next = generator.next();
    expect(next.value).toEqual(
      all([call(uploadDocument, 'Receipt', { name: 'xyz.png', size: 1123 })]),
    );
    next = generator.next(uploadFilePayload);
    expect(next.value).toBe('STOP_LOADER');

    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle submit claim error scenario when settlement advice file submission fails', () => {
    const action = {
      type: SUBMIT_CLAIM,
      payload: {
        claimData: {
          patientId: '12',
          contactNumber: '12345678',
          claimId: 'MO-GP',
          diagnosis: 'Abdominal Pain',
          consultationDate: '',
          claimType: 'General Medical Practitioner',
          receiptAmount: '1234',
          receipts: { files: [{ name: 'xyz.png', size: 1123 }] },
          settlementAdvices: { files: [{ name: 'xyz.png', size: 1123 }] },
          anotherInsurerEnabled: true,
        },
        loaderMessage: 'loading...',
      },
    };
    const updateTNCActionPayload = {
      type: 'UPDATE_TNC_ACTION',
      payload: {
        tncAction: true,
      },
    };
    const uploadFilePayload = ['Error'];

    const generator = submitClaimSaga(action);
    generator.next();
    generator.next();
    let next = generator.next(updateTNCActionPayload);
    expect(next.value).toStrictEqual(['START_LOADER', 'page', 'loading...']);
    next = generator.next();
    next = generator.next([]);
    expect(next.value).toEqual(
      all([
        call(uploadDocument, 'SettlementAdvices', {
          name: 'xyz.png',
          size: 1123,
        }),
      ]),
    );
    next = generator.next(uploadFilePayload);
    expect(next.value).toBe('STOP_LOADER');

    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle submit claim error scenario when prescriptions file submission fails', () => {
    const action = {
      type: SUBMIT_CLAIM,
      payload: {
        claimData: {
          patientId: '12',
          contactNumber: '12345678',
          claimId: 'MO-GP',
          diagnosis: 'Abdominal Pain',
          consultationDate: '',
          claimType: 'General Medical Practitioner',
          receiptAmount: '1234',
          receipts: { files: [{ name: 'xyz.png', size: 1123 }] },
          prescriptions: { files: [{ name: 'xyz.png', size: 1123 }] },
          isChineseHerbalist: true,
        },
        loaderMessage: 'loading...',
      },
    };
    const updateTNCActionPayload = {
      type: 'UPDATE_TNC_ACTION',
      payload: {
        tncAction: true,
      },
    };
    const uploadFilePayload = ['Error'];

    const generator = submitClaimSaga(action);
    generator.next();
    generator.next();
    let next = generator.next(updateTNCActionPayload);
    expect(next.value).toStrictEqual(['START_LOADER', 'page', 'loading...']);
    next = generator.next();
    next = generator.next([]);
    expect(next.value).toEqual(
      all([
        call(uploadDocument, 'Prescriptions', {
          name: 'xyz.png',
          size: 1123,
        }),
      ]),
    );
    next = generator.next(uploadFilePayload);
    expect(next.value).toBe('STOP_LOADER');

    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle submit claim error scenario when referral file submission fails', () => {
    const action = {
      type: SUBMIT_CLAIM,
      payload: {
        claimData: {
          patientId: '12',
          contactNumber: '12345678',
          claimId: 'MO-GP',
          diagnosis: 'Abdominal Pain',
          consultationDate: '',
          claimType: 'General Medical Practitioner',
          receiptAmount: '1234',
          receipts: { files: [{ name: 'xyz.png', size: 1123 }] },
          referral: { files: [{ name: 'abc.png', size: 1234 }] },
          referralRequired: true,
        },
      },
    };

    const uploadFilePayload = ['Error'];
    const updateTNCActionPayload = {
      type: 'UPDATE_TNC_ACTION',
      payload: {
        tncAction: true,
      },
    };

    const generator = submitClaimSaga(action);
    generator.next();
    generator.next();
    generator.next(updateTNCActionPayload);
    generator.next();
    generator.next([123]);
    generator.next(uploadFilePayload);
    generator.next();
    const next = generator.next();
    expect(next.done).toEqual(true);
  });

  it('should handle submit claim error scenario when user dont accept term and condition', () => {
    const action = {
      type: SUBMIT_CLAIM,
      payload: {
        claimData: {
          patientId: '12',
          contactNumber: '12345678',
          claimId: 'MO-GP',
          diagnosis: 'Abdominal Pain',
          consultationDate: '',
          claimType: 'General Medical Practitioner',
          receiptAmount: '1234',
          receipts: { files: [{ name: 'xyz.png', size: 1123 }] },
          referral: { files: [{ name: 'referral.png', size: 1234 }] },
          referralRequired: true,
        },
      },
    };
    const updateTNCActionPayload = {
      type: 'UPDATE_TNC_ACTION',
      payload: {
        tncAction: false,
      },
    };

    const generator = submitClaimSaga(action);
    let next = generator.next();
    expect(next.value).toEqual(put(updateTNCModal(true)));
    next = generator.next();
    expect(next.value).toEqual(take(UPDATE_TNC_ACTION));
    next = generator.next(updateTNCActionPayload);
    expect(next.done).toEqual(true);
  });

  it('should handle the error for get wallet balance', () => {
    const errorPayload = {
      error: true,
    };
    const generator = getWalletBalanceSaga();

    let next = generator.next();

    expect(next.value).toStrictEqual([
      'START_LOADER',
      'walletBalance',
      undefined,
    ]);

    next = generator.next();

    expect(next.value).toEqual(call(getWalletBalance));

    next = generator.next(errorPayload);

    expect(next.value).toEqual(put(updateWalletBalance(undefined, true)));

    next = generator.next();

    expect(next.value).toBe('STOP_LOADER');

    next = generator.next();

    expect(next.value).toBe(undefined);
    expect(next.done).toBe(true);
  });

  it('should handle get terms and conditions', () => {
    // getCookie.mockReturnValue(false);
    const termsAndConditionResponse = [
      'Terms and conditions',
      'Terms in Chinese',
    ];
    const saveTermsAndConditions = {};
    saveTermsAndConditions['en-HK'] = 'Terms and conditions';
    saveTermsAndConditions['zh-HK'] = 'Terms in Chinese';
    const generator = getTermAndConditionSaga();

    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page', undefined]);
    next = generator.next();
    expect(next.value).toStrictEqual(
      all([
        call(getTermsConditions, 'en-HK'),
        call(getTermsConditions, 'zh-HK'),
      ]),
    );
    next = generator.next(termsAndConditionResponse);
    expect(next.value).toStrictEqual(
      put(updateTermAndCondition(saveTermsAndConditions)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });
});
