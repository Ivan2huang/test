import { connect } from 'react-redux';

import { getClaims, filterClaims } from './action';
import { membersSelector } from './selector';
import Claims from './Claims';
import { getMemberProfile } from '../me/action';

import NoClaims from './NoClaims';
import ClaimsHeader from './ClaimsHeader';
import NoClaimsDependent from './NoClaimsDependent';
import ClaimsHeaderDependent from './ClaimsHeaderDependent';

export const mapStateToProps = ({ claim, me }) => ({
  role: me.member.profile.role,
  pendingClaims: claim.history.pendingClaims,
  approvedRejectedClaims: claim.history.approvedRejectedClaims,
  appliedFilters: claim.history.appliedFilters,
  membersMap: membersSelector(me),
});

export const mapDispatchToProps = dispatch => ({
  getClaims: () => {
    dispatch(getClaims());
  },
  filterClaims: appliedFilters => {
    dispatch(filterClaims(appliedFilters));
  },
  getMemberProfile: () => {
    dispatch(getMemberProfile());
  },
});

export const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { role } = stateProps;
  const noclaimsMap = {
    employee: NoClaims,
    dependent: NoClaimsDependent,
  };
  const claimsHeaderMap = {
    employee: ClaimsHeader,
    dependent: ClaimsHeaderDependent,
  };

  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    components: {
      NoClaims: noclaimsMap[role.toLowerCase()],
      ClaimsHeader: claimsHeaderMap[role.toLowerCase()],
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Claims);
