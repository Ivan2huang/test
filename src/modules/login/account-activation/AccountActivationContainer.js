import { connect } from 'react-redux';

import { verify, resend, checkOTPStatus } from './action';
import AccountActivation from './AccountActivation';

export const mapStateToProps = ({ accountActivation }) => ({
  email: accountActivation.email,
  otpStatus: accountActivation.otpStatus,
});

export const mapDispatchToProps = dispatch => ({
  resend: () => dispatch(resend()),
  verify: otpCode => dispatch(verify(otpCode)),
  checkStatus: () => dispatch(checkOTPStatus()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountActivation);
