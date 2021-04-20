import React from 'react';
import { compose } from 'redux';
import { PurchaseResult } from '../../modules/payment';
import withPaymentLayout from '../../layouts/withPaymentLayoutProvider';

const PurchaseResultContent = compose(withPaymentLayout)(PurchaseResult);

const PurchaseResultPage = ({ ...props }) => (
  <PurchaseResultContent {...props} />
);

PurchaseResultPage.getInitialProps = async ({ req }) => {
  const { PaRes, MD } = req.body;
  return { paRes: PaRes, MD };
};

export default PurchaseResultPage;
