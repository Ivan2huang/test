import { mapDispatchToProps, mapStateToProps } from '../ClaimDetailsContainer';
import { formatDate } from '../../../../helpers/helpers';

describe('Claim Details Container', () => {
  it('should dispatch get claim details action', () => {
    const dispatch = jest.fn();
    const expected = {
      type: 'GET_CLAIM_DETAILS',
      payload: {
        id: 12,
        claims: [],
      },
    };
    const dispatchToProps = mapDispatchToProps(dispatch);
    dispatchToProps.getNewClaimDetails(12);

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
  it('should dispatch get memberProfile action', () => {
    const dispatch = jest.fn();
    const expected = {
      type: 'GET_MEMBER_PROFILE',
      payload: {},
    };
    const dispatchToProps = mapDispatchToProps(dispatch);
    dispatchToProps.getMemberProfile();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
  it('should call map state to props', () => {
    const state = {
      claim: {
        claimDetails: {
          status: 'Pending',
          statusCode: 'PENDING',
          claimSubmissionDate: '11 Sep 2019',
          patientName: '3',
          contactNumber: '123456',
          claimItemCategoryCode: 'outpatient',
          consultationType: 'Outpatient',
          diagnosis: 'Abdominal Colic',
          consultationDate: '11 Sep 2019',
          receiptAmount: 1,
          reimbursedAmount: 0,
          settlementDate: '11 Sep 2019',
          claimAmountOtherInsurer: 0,
          receipts: [],
          referrals: [],
        },
        history: {
          pendingClaims: [],
          approvedRejectedClaims: [],
        },
      },
      me: {
        member: {
          profile: {
            memberId: 1,
            fullName: 'name1',
            dependants: [
              {
                memberId: 2,
                fullName: 'name2',
              },
            ],
          },
        },
      },
    };
    const expected = {
      claimDetails: {
        status: 'Pending',
        statusCode: 'PENDING',
        claimSubmissionDate: formatDate('2019-09-11T04:34:18.065384'),
        patientName: '3',
        contactNumber: '123456',
        claimItemCategoryCode: 'outpatient',
        consultationType: 'Outpatient',
        diagnosis: 'Abdominal Colic',
        consultationDate: formatDate('2019-09-11T04:31:26'),
        receiptAmount: 1,
        reimbursedAmount: 0,
        settlementDate: formatDate('2019-09-11T05:00:31.68479'),
        claimAmountOtherInsurer: 0,
        receipts: [],
        referrals: [],
      },
      membersMap: {
        1: 'name1',
        2: 'name2',
      },
      claims: [],
    };
    const stateProps = mapStateToProps(state);

    expect(stateProps).toEqual(expected);
  });
  it('should pass empty claim details when no claim details', () => {
    const state = {
      claim: {
        claimDetails: {},
        history: {
          pendingClaims: [],
          approvedRejectedClaims: [],
        },
      },
      me: {
        member: {
          profile: {
            memberId: '',
            fullName: '',
            dependants: [],
          },
        },
      },
    };
    const expected = {
      claimDetails: {
        status: '',
        statusCode: '',
        claimSubmissionDate: '',
        claimantId: '',
        contactNumber: '',
        claimItemCategoryCode: '',
        consultationType: '',
        diagnosis: '',
        consultationDate: '',
        receiptAmount: 0,
        reimbursedAmount: 0,
        settlementDate: '',
        claimAmountOtherInsurer: 0,
        receipts: [],
        referrals: [],
        isMaternity: false,
        paymentList: [],
      },
      membersMap: {},
      claims: [],
    };
    const stateProps = mapStateToProps(state);

    expect(stateProps).toEqual(expected);
  });
});
