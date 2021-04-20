import { connect } from 'react-redux';

import Privacy from './Privacy';
import { getPrivacyPolicy } from './action';

export const mapStateToProps = ({ legalContents }) => ({
  privacyPolicy: legalContents.privacyPolicy.content,
});

export const mapDispatchToProps = dispatch => ({
  getPrivacyPolicy: locales => dispatch(getPrivacyPolicy(locales)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Privacy);
