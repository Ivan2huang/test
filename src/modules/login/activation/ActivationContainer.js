import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { validateActivation } from './action';
import ActivationPage from './Activation';

export const mapStateToProps = state => ({
  verificationStatus: state.activation.verificationStatus,
});

export const mapDispatchToProps = dispatch => ({
  activate: (email, token) => dispatch(validateActivation(email, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ActivationPage));
