import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import { forgotPassword } from '../forgot-password/action';
import ResetPasswordLinkExpired from './ResetPasswordLinkExpired';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = dispatch => ({
  forgotPassword: (email, verify) => dispatch(forgotPassword(email, verify)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ResetPasswordLinkExpired));
