import React from 'react';
import { compose } from 'redux';
import { CheckOutResult } from '../../modules/payment';
import withPaymentLayout from '../../layouts/withPaymentLayoutProvider';

const CheckOutResultContent = compose(withPaymentLayout)(CheckOutResult);

const CheckOutResultPage = ({ ...props }) => (
  <CheckOutResultContent {...props} />
);

CheckOutResultPage.getInitialProps = async ({ req }) => {
  const { PaRes, MD } = req.body;
  return { paRes: PaRes, MD };
};

export default CheckOutResultPage;
