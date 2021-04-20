/* eslint-disable no-param-reassign */
import { connect } from 'react-redux';
import ClaimDetails from './ClaimDetails';
import { getNewClaimDetails } from './action';
import { membersSelector } from '../selector';
import { getMemberProfile } from '../../me';

const DEFAULT_CLAIM_DETAILS = {
  status: '',
  statusCode: '',
  claimSubmissionDate: '',
  claimantId: '',
  contactNumber: '',
  claimItemCategoryCode: '',
  consultationType: '',
  receiptAmount: 0,
  reimbursedAmount: 0,
  settlementDate: '',
  claimAmountOtherInsurer: 0,
  diagnosis: '',
  consultationDate: '',
  receipts: [],
  referrals: [],
  isMaternity: false,
  paymentList: [],
};

export const mapStateToProps = ({ claim: { claimDetails, history }, me }) => {
  return {
    claimDetails: Object.keys(claimDetails).length
      ? claimDetails
      : DEFAULT_CLAIM_DETAILS,
    membersMap: membersSelector(me),
    claims: [...history.pendingClaims, ...history.approvedRejectedClaims],
  };
};

export const mapDispatchToProps = dispatch => ({
  getNewClaimDetails: (id, claims = []) =>
    dispatch(getNewClaimDetails(id, claims)),
  getMemberProfile: () => {
    dispatch(getMemberProfile());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClaimDetails);
