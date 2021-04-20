import React from 'react';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import withPaymentLayout from '../../layouts/withPaymentLayoutProvider';
import { CheckOut, getMPGSSessionUrl } from '../../modules/payment';
import { isValidLanguageCode } from '../../helpers/helpers';
import CONFIG from '../../constants/config';
import { PAYMENT_JWT } from '../../constants/auth';

const CheckOutContent = compose(
  injectIntl,
  withPaymentLayout,
)(CheckOut);

const CheckOutPage = ({ ...props }) => <CheckOutContent {...props} />;

CheckOutPage.getInitialProps = async ({ req, res }) => {
  const { callbackUrl, order, jwt, lang } = req.body;
  const parsedOrder = JSON.parse(order || '{}');
  const { mpgsSessionUrl } = await getMPGSSessionUrl(jwt);

  const oneMinute = 60 * 1000;
  const expires = new Date(Date.now() + CONFIG.paymentJwtDuration * oneMinute);
  res.cookie(PAYMENT_JWT, jwt, {
    secure: false,
    httpOnly: false,
    signed: false,
    expires,
  });

  const selectedLanguage = isValidLanguageCode(lang)
    ? lang
    : CONFIG.defaultLanguage;
  res.cookie('lang', selectedLanguage);

  return {
    callbackUrl,
    jwt,
    order: {
      ...parsedOrder,
      redirectUrl: callbackUrl,
    },
    mpgsSessionUrl,
    lang: selectedLanguage,
  };
};

export default compose(injectIntl)(CheckOutPage);
