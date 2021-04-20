import { mapDispatchToProps, mapStateToProps } from '../ReviewClaimContainer';

jest.mock('../action', () => ({
  submitClaim: jest.fn((claimData, loaderMessage) => ({
    type: 'SUBMIT_CLAIM',
    payload: {
      claimData,
      loaderMessage,
    },
  })),
  updateTNCModal: jest.fn(tncModal => ({
    type: 'UPDATE_TNC_MODAL',
    payload: {
      tncModal,
    },
  })),
  updateTNCAction: jest.fn(tncAction => ({
    type: 'UPDATE_TNC_ACTION',
    payload: {
      tncAction,
    },
  })),
  updatePreviewModal: jest.fn(previewModal => ({
    type: 'UPDATE_PREVIEW_MODAL',
    payload: {
      previewModal,
    },
  })),
}));

describe('ReviewClaimContainer', () => {
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
        previewModal: false,
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
            },
          ],
        },
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
            contactNumber: '01234',
          },
        },
      },
    },
  };

  const propExpected = {
    tncModal: false,
    previewModal: false,
    patient: {
      patientId: 12,
      contactNumber: '01234',
      patientName: 'dummyUser',
    },
    claimData: {
      anotherInsurerEnabled: false,
      claim: {
        anotherInsurer: false,
        claimId: 10,
        consultationDate: undefined,
        diagnosis: 11,
        isMaternity: false,
        otherInsurerAmount: undefined,
        receiptAmount: undefined,
      },
      consultationType: 'General practitioner',
      isChineseHerbalist: false,
      prescriptions: undefined,
      receipts: undefined,
      referral: undefined,
      referralRequired: true,
      selectedClaimReason: 'reason 1',
      settlementAdvices: undefined,
    },
  };

  it('should pass props to component', () => {
    const actual = mapStateToProps(state);
    expect(actual).toEqual(propExpected);
  });

  it('should pass empty props to component if there are no state data', () => {
    const emptyState = {
      me: state.me,
      claim: {
        makeClaim: {},
      },
      form: {},
    };
    const actual = mapStateToProps(emptyState);
    expect(actual).toEqual({ patient: null, claimData: null });
  });

  it('should dispatch the submit claim action', () => {
    const dispatch = jest.fn();

    const dispatchToProps = mapDispatchToProps(dispatch);
    const expected = {
      type: 'SUBMIT_CLAIM',
      payload: {},
    };
    dispatchToProps.submitClaim();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch the update TNC modal action', () => {
    const dispatch = jest.fn();

    const dispatchToProps = mapDispatchToProps(dispatch);
    const expected = {
      type: 'UPDATE_TNC_MODAL',
      payload: {},
    };
    dispatchToProps.updateTNCModal();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch the update TNC action', () => {
    const dispatch = jest.fn();

    const dispatchToProps = mapDispatchToProps(dispatch);
    const expected = {
      type: 'UPDATE_TNC_ACTION',
      payload: {},
    };
    dispatchToProps.updateTNCAction();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch the update preview modal action', () => {
    const dispatch = jest.fn();

    const dispatchToProps = mapDispatchToProps(dispatch);
    const expected = {
      type: 'UPDATE_PREVIEW_MODAL',
      payload: {},
    };
    dispatchToProps.updatePreviewModal();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
