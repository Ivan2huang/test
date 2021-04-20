import React from 'react';
import { compose } from 'redux';
import { PaymentResult } from '../../modules/payment';
import withPaymentLayout from '../../layouts/withPaymentLayoutProvider';

const PaymentResultContent = compose(withPaymentLayout)(PaymentResult);

const PaymentResultPage = ({ ...props }) => <PaymentResultContent {...props} />;

PaymentResultPage.getInitialProps = async ({ req }) => {
  const { PaRes, MD } = req.body;
  return { paRes: PaRes, MD };
};

export default PaymentResultPage;
