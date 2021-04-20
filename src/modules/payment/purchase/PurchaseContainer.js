import { connect } from 'react-redux';

import Purchase from './Purchase';
import {
  getPaymentPurchaseMethods,
  makePayment,
  getNoteTexts,
} from '../action';
import { orderSelector, mpgsSessionUrlSelector } from '../selector';

export const mapStateToProps = state => {
  const {
    payment: {
      isLoadingPaymentMethods,
      isMakingPayment,
      purchasePaymentMethods,
    },
  } = state;
  const order = orderSelector(purchasePaymentMethods);
  const mpgsSessionUrl = mpgsSessionUrlSelector(purchasePaymentMethods);

  return {
    isLoadingPaymentMethods,
    isMakingPayment,
    order,
    mpgsSessionUrl,
    paymentMethods: purchasePaymentMethods.payments || [],
    extData: purchasePaymentMethods.extData || {},
  };
};

export const mapDispatchToProps = {
  getPaymentPurchaseMethods,
  makePayment,
  getNoteTexts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Purchase);
