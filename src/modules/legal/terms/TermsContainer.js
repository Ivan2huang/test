import { connect } from 'react-redux';

import Terms from './terms';
import { getTermsConditions, acceptTerms } from './action';

export const mapStateToProps = ({ legalContents, me }) => ({
  termsConditions: legalContents.termsConditions.content,
  alreadyAcceptedTerms: me.member.profile.isTermsAccepted,
});

export const mapDispatchToProps = dispatch => ({
  getTermsConditions: (alreadyAcceptedTerms, locales) =>
    dispatch(getTermsConditions(alreadyAcceptedTerms, locales)),
  acceptTerms: alreadyAcceptedEdm => dispatch(acceptTerms(alreadyAcceptedEdm)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Terms);
