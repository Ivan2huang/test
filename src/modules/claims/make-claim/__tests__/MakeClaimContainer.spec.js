import { mapDispatchToProps, mapStateToProps } from '../MakeClaimContainer';
import { loaderDetail } from '../../../loader';

jest.mock('../action', () => ({
  getClaimTypes: jest.fn(() => ({
    type: 'GET_CLAIM_TYPES',
    payload: {},
  })),
  getClaimItems: jest.fn(() => ({
    type: 'GET_CLAIM_ITEMS',
    payload: {},
  })),
  getClaimFields: jest.fn((planId, claimId) => ({
    type: 'GET_CLAIM_FIELDS',
    payload: {
      planId,
      claimId,
    },
  })),
  getWalletBalance: jest.fn(() => ({
    type: 'GET_WALLET_BALANCE',
    payload: {},
  })),
  getTermAndCondition: jest.fn(() => ({
    type: 'GET_TERM_AND_CONDITION',
    payload: {},
  })),
}));

jest.mock('../../../me', () => ({
  getMemberProfile: jest.fn(() => ({
    type: 'GET_MEMBER_PROFILE',
    payload: {},
  })),
}));

jest.mock('../../../loader/util', () => ({
  loaderDetail: jest.fn(() => ({
    loading: true,
    message: '',
  })),
}));

jest.mock('moment', () => {
  const originalMoment = jest.requireActual('moment');
  const moment = jest.fn(() => {
    return originalMoment(new Date('2020/03/01'));
  });
  moment.utc = originalMoment.utc;
  return moment;
});

describe('MakeClaimContainer', () => {
  const memberToWalletBalanceMap = {};
  memberToWalletBalanceMap['12'] = 2000;
  memberToWalletBalanceMap['27'] = 1000;
  const state = {
    claim: {
      makeClaim: {
        categories: {
          all: [1, 2],
          byId: {
            1: {
              id: 1,
              code: 'outpatient',
              claimCategory: 'Outpatient',
              claimTypeIds: [10],
            },
            2: {
              id: 2,
              code: 'wellness',
              claimCategory: 'Wellness',
              claimTypeIds: [11],
            },
          },
        },
        types: {
          byId: {
            10: {
              id: 10,
              code: 'MO-GP',
              claimType: 'General practitioner',
              isInsuranceClaim: true,
              referralRequired: true,
              maxAmountPerClaim: 800,
              claimReasonIds: [11],
              maxAdditionalDocument: 2,
            },
            11: {
              id: 11,
              code: 'NF-CHNHERBA',
              claimType: 'Chinese Herbalist',
              isInsuranceClaim: true,
              referralRequired: true,
              maxAmountPerClaim: 800,
              claimReasonIds: [11],
              maxAdditionalDocument: 2,
            },
          },
        },
        reasons: {
          byId: {
            11: {
              id: 11,
              claimReason: 'reason 1',
            },
          },
        },
        maxReceiptAmount: 800,
        referralRequired: true,
        tncModal: false,
        walletBalance: {
          memberToWalletBalanceMap,
          error: false,
        },
      },
    },
    me: {
      member: {
        profile: {
          fullName: 'dummyUser',
          memberId: '12',
          contactNumber: 123456789,
          dependants: [
            {
              fullName: 'dummyDependant',
              memberId: '123',
              status: 'Terminated',
              terminationDate: '2020/02/14',
              limitedAccessUntil: '2020-03-07T10:43:15Z',
            },
            {
              fullName: 'dummyDependant 3',
              memberId: '125',
              status: 'Terminated',
              terminationDate: '2020/02/14',
            },
          ],
        },
      },
    },
    loader: {
      claimDiagnosis: {
        loaderCount: 1,
        message: '',
      },
      walletBalance: {
        loaderCount: 1,
        message: '',
      },
    },
    form: {
      'make-claim': {
        values: {
          claim: {
            claimId: 10,
            anotherInsurer: false,
            diagnosis: 11,
          },
          patient: {
            patientId: 12,
          },
        },
      },
    },
  };

  it('should pass the props to the component', () => {
    const expected = {
      patients: [
        {
          fullName: 'dummyUser',
          memberId: '12',
          status: undefined,
          terminationDate: undefined,
          limitedAccessUntil: undefined,
        },
        {
          fullName: 'dummyDependant',
          limitedAccessUntil: '2020-03-07T10:43:15Z',
          memberId: '123',
          status: 'Terminated',
          terminationDate: '2020/02/14',
        },
      ],
      consultationTypes: {
        outpatient: [
          {
            key: 10,
            code: 'MO-GP',
            value: 'General practitioner',
          },
        ],
        wellness: [
          {
            key: 11,
            code: 'NF-CHNHERBA',
            value: 'Chinese Herbalist',
          },
        ],
      },
      diagnosisTypes: [{ key: 11, value: 'reason 1' }],
      insuranceClaim: true,
      selectedClaimId: 10,
      anotherInsurerEnabled: false,
      selectedPatientId: 12,
      maxReceiptAmount: 800,
      referralRequired: true,
      initialValues: {
        patient: {
          patientId: '12',
          contactNumber: '123456789',
        },
        claim: {
          anotherInsurer: false,
          consultationDate: null,
        },
        receipts: {
          files: [],
        },
        referral: {
          files: [],
        },
        prescriptions: {
          files: [],
        },
        settlementAdvices: {
          files: [],
        },
      },
      loader: {
        diagnosis: {
          loading: true,
          message: '',
        },
        walletBalance: {
          loading: true,
          message: '',
        },
      },
      walletBalance: {
        memberToWalletBalanceMap,
        error: false,
      },
      isChineseHerbalist: false,
      maxAdditionalDocumentAllowed: 2,
      selectedDiagnosisKey: 11,
      isTerminatedPatient: false,
      terminatedDate: undefined,
      consultationCategoryName: {
        outpatient: 'Outpatient',
        wellness: 'Wellness',
      },
    };

    const actual = mapStateToProps(state);
    expect(loaderDetail).toHaveBeenCalledWith(
      {
        claimDiagnosis: {
          loaderCount: 1,
          message: '',
        },
        walletBalance: {
          loaderCount: 1,
          message: '',
        },
      },
      'claimDiagnosis',
    );
    expect(loaderDetail).toHaveBeenCalledWith(
      {
        claimDiagnosis: {
          loaderCount: 1,
          message: '',
        },
        walletBalance: {
          loaderCount: 1,
          message: '',
        },
      },
      'walletBalance',
    );
    expect(actual).toEqual(expected);
  });

  it('should pass the props to the component with isChineseHerbalist enabled', () => {
    const expected = {
      patients: [
        {
          fullName: 'dummyUser',
          memberId: '12',
          status: undefined,
          terminationDate: undefined,
          limitedAccessUntil: undefined,
        },
        {
          fullName: 'dummyDependant',
          memberId: '123',
          status: 'Terminated',
          terminationDate: '2020/02/14',
          limitedAccessUntil: '2020-03-07T10:43:15Z',
        },
      ],
      consultationTypes: {
        outpatient: [
          {
            key: 10,
            code: 'MO-GP',
            value: 'General practitioner',
          },
        ],
        wellness: [
          {
            key: 11,
            code: 'NF-CHNHERBA',
            value: 'Chinese Herbalist',
          },
        ],
      },
      diagnosisTypes: [{ key: 11, value: 'reason 1' }],
      insuranceClaim: true,
      selectedClaimId: 11,
      anotherInsurerEnabled: false,
      selectedPatientId: 12,
      maxReceiptAmount: 800,
      referralRequired: true,
      initialValues: {
        patient: {
          patientId: '12',
          contactNumber: '123456789',
        },
        claim: {
          anotherInsurer: false,
          consultationDate: null,
        },
        receipts: {
          files: [],
        },
        referral: {
          files: [],
        },
        prescriptions: {
          files: [],
        },
        settlementAdvices: {
          files: [],
        },
      },
      loader: {
        diagnosis: {
          loading: true,
          message: '',
        },
        walletBalance: {
          loading: true,
          message: '',
        },
      },
      walletBalance: {
        memberToWalletBalanceMap,
        error: false,
      },
      isChineseHerbalist: true,
      maxAdditionalDocumentAllowed: 2,
      selectedDiagnosisKey: 11,
      isTerminatedPatient: false,
      terminatedDate: undefined,
      consultationCategoryName: {
        outpatient: 'Outpatient',
        wellness: 'Wellness',
      },
    };

    state.form['make-claim'].values.claim.claimId = 11;
    const actual = mapStateToProps(state);
    expect(actual).toEqual(expected);
  });

  it('should pass the empty diagnosis props to the component if claim type is not selected', () => {
    const newState = {
      ...state,
      form: {
        claim: {
          claimId: undefined,
        },
      },
    };

    const { diagnosisTypes } = mapStateToProps(newState);

    expect(diagnosisTypes).toEqual([]);
  });

  it('should dispatch the get member profile action', () => {
    const dispatch = jest.fn();

    const dispatchToProps = mapDispatchToProps(dispatch);
    const expected = {
      type: 'GET_MEMBER_PROFILE',
      payload: {},
    };
    dispatchToProps.getMemberProfile();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch the get claim types action', () => {
    const dispatch = jest.fn();

    const dispatchToProps = mapDispatchToProps(dispatch);
    const expected = {
      type: 'GET_CLAIM_TYPES',
      payload: {},
    };
    dispatchToProps.getClaimTypes();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch the get wallet balance action', () => {
    const dispatch = jest.fn();

    const dispatchToProps = mapDispatchToProps(dispatch);
    const expected = {
      type: 'GET_WALLET_BALANCE',
      payload: {},
    };
    dispatchToProps.getWalletBalance();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should pass the props to the component with terminated patient', () => {
    const expected = {
      patients: [
        {
          fullName: 'dummyUser',
          memberId: '12',
          status: undefined,
          terminationDate: undefined,
          limitedAccessUntil: undefined,
        },
        {
          fullName: 'dummyDependant',
          memberId: '123',
          status: 'Terminated',
          terminationDate: '2020/02/14',
          limitedAccessUntil: '2020-03-07T10:43:15Z',
        },
      ],
      consultationTypes: {
        outpatient: [
          {
            key: 10,
            code: 'MO-GP',
            value: 'General practitioner',
          },
        ],
        wellness: [
          {
            key: 11,
            code: 'NF-CHNHERBA',
            value: 'Chinese Herbalist',
          },
        ],
      },
      diagnosisTypes: [{ key: 11, value: 'reason 1' }],
      insuranceClaim: true,
      selectedClaimId: 11,
      anotherInsurerEnabled: false,
      selectedPatientId: '123',
      maxReceiptAmount: 800,
      referralRequired: true,
      initialValues: {
        patient: {
          patientId: '12',
          contactNumber: '123456789',
        },
        claim: {
          anotherInsurer: false,
          consultationDate: null,
        },
        receipts: {
          files: [],
        },
        referral: {
          files: [],
        },
        prescriptions: {
          files: [],
        },
        settlementAdvices: {
          files: [],
        },
      },
      loader: {
        diagnosis: {
          loading: true,
          message: '',
        },
        walletBalance: {
          loading: true,
          message: '',
        },
      },
      walletBalance: {
        memberToWalletBalanceMap,
        error: false,
      },
      isChineseHerbalist: true,
      maxAdditionalDocumentAllowed: 2,
      selectedDiagnosisKey: 11,
      isTerminatedPatient: true,
      terminatedDate: '2020/02/14',
      consultationCategoryName: {
        outpatient: 'Outpatient',
        wellness: 'Wellness',
      },
    };

    state.form['make-claim'].values.patient.patientId = '123';

    const actual = mapStateToProps(state);
    expect(actual).toEqual(expected);
  });

  it('should dispatch the get term and condition action', () => {
    const dispatch = jest.fn();

    const dispatchToProps = mapDispatchToProps(dispatch);
    const expected = {
      type: 'GET_TERM_AND_CONDITION',
      payload: {},
    };
    dispatchToProps.getTermAndCondition();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
