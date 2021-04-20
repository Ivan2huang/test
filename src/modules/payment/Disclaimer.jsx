import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useIntl, FormattedMessage } from 'react-intl';
import Typography from '../../uiComponents/Typography';
import { formatMessage } from '../../helpers/helpers';
import CONFIG from '../../constants/config';
import { OPEN_TERM_OF_USE_MESSAGE_TYPE } from './constants';

const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: theme.spacingX(2),
  },
  link: {
    color: theme.outline,
    cursor: 'pointer',
  },
}));

const Disclaimer = () => {
  const classes = useStyles();
  const intl = useIntl();

  const openTermOfUse = () => {
    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      const messageData = {
        type: OPEN_TERM_OF_USE_MESSAGE_TYPE,
        url: CONFIG.paymentTermOfUseUrl,
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(messageData));
    } else {
      window.open(CONFIG.paymentTermOfUseUrl);
    }
  };

  return (
    <>
      <Typography type="style-8" fontWeight="bold" className={classes.header}>
        {formatMessage(
          intl,
          'payment.checkout.disclaimer.header',
          'Disclaimer',
        )}
      </Typography>
      <Typography type="style-8">
        <FormattedMessage
          id="payment.checkout.disclaimer.content"
          defaultMessage={`By purchasing, using or obtaining any products, services or
        consultations made available through HealthPass (a) you acknowledge and
        understand that HealthPass is developed, operated and maintained jointly by
        various third party providers; and (b) you agree that you have read and agree to
        the {termOfUseLink} of HealthPass ("Terms of Use") governing your usage of HealthPass, which
        provide amongst other matters, that all products, services and
        consultations made available through HealthPass are not provided by OCBC
        but by Third Party Providers (as defined under the Terms of Use) under
        an independent contract entered between you and the Third Party
        Provider, for which OCBC has no responsibility.`}
          values={{
            termOfUseLink: (
              <Typography
                type="style-8"
                component="span"
                className={classes.link}
                color="outline"
                onClick={openTermOfUse}
                data-testid="open-term-of-use"
              >
                {formatMessage(
                  intl,
                  'payment.checkout.disclaimer.termOfUse',
                  'Term of Use',
                )}
              </Typography>
            ),
          }}
        />
      </Typography>
    </>
  );
};

export default Disclaimer;
