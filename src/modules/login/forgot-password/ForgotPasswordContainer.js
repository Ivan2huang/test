import { connect } from 'react-redux';

import { forgotPassword } from './action';
import ForgotPassword from './ForgotPassword';
import ForgotPasswordSuccess from './ForgotPasswordSuccess';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = dispatch => ({
  forgotPassword: (email, verify) => dispatch(forgotPassword(email, verify)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword);

const ForgotPasswordSuccessContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordSuccess);

export { ForgotPasswordSuccessContainer };
