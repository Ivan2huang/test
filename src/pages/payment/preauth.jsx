import React from 'react';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Payment, getMPGSSessionUrl } from '../../modules/payment';
import withPaymentLayout from '../../layouts/withPaymentLayoutProvider';
import CONFIG from '../../constants/config';
import { PAYMENT_JWT } from '../../constants/auth';

export const PaymentContent = compose(
  injectIntl,
  withPaymentLayout,
)(Payment);

const PaymentPage = ({ ...props }) => <PaymentContent {...props} />;

PaymentPage.getInitialProps = async ({ req, res }) => {
  const { callbackUrl, PaRes, jwt, merchantOrderId } = req.body;
  const { mpgsSessionUrl } = await getMPGSSessionUrl(jwt);

  const oneMinute = 60 * 1000;
  const expires = new Date(Date.now() + CONFIG.paymentJwtDuration * oneMinute);
  res.cookie(PAYMENT_JWT, jwt, {
    secure: false,
    httpOnly: false,
    signed: false,
    expires,
  });

  return {
    callbackUrl,
    paRes: PaRes,
    merchantOrderId,
    mpgsSessionUrl,
  };
};

export default compose(injectIntl)(PaymentPage);
