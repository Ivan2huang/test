import { connect } from 'react-redux';

import CheckOut from './CheckOut';
import { getPaymentMethods, checkOutOrder, goBack } from '../action';

export const mapStateToProps = state => {
  const {
    payment: { isLoadingPaymentMethods, isCheckingOut },
  } = state;
  return {
    isLoadingPaymentMethods,
    isCheckingOut,
  };
};

export const mapDispatchToProps = dispatch => ({
  getPaymentMethods: query => dispatch(getPaymentMethods(query)),
  checkOutOrder: (order, userId, clientId, callBackUrl, jwt) => {
    dispatch(checkOutOrder(order, userId, clientId, callBackUrl, jwt));
  },
  goBack: url => dispatch(goBack(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckOut);
