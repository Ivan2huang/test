import { connect } from 'react-redux';

import CheckOutMethodForm from './check-out-method-form';

export const mapStateToProps = state => {
  return {
    paymentMethods: state.payment.paymentMethods,
  };
};

export const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const paymentMethods = ownProps.paymentMethods || stateProps.paymentMethods;
  return {
    ...ownProps,
    ...stateProps,
    paymentMethods,
  };
};

export default connect(
  mapStateToProps,
  null,
  mergeProps,
)(CheckOutMethodForm);
