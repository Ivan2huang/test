import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Box, Card, CardContent } from '@material-ui/core';
import Loading from '../Loading';
import { IntlPropType } from '../../../i18n/lang';

const PurchaseResult = ({ paRes, MD, validatePayment, intl }) => {
  useEffect(() => {
    validatePayment(paRes, MD);
  }, [paRes, MD]);

  return (
    <Box
      mt={{
        sm: 12,
      }}
    >
      <Card style={{ paddingLeft: 16, paddingRight: 16 }}>
        <CardContent>
          <Box mt={{ sm: 12 }}>
            <Loading
              message={intl.formatHTMLMessage({
                id: 'payment.checkout.message.result',
                defaultMessage:
                  'Your payment is being processed, please do not exit this screen.',
              })}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

PurchaseResult.defaultProps = {
  paRes: '',
  MD: '',
};

PurchaseResult.propTypes = {
  paRes: PropTypes.string,
  MD: PropTypes.string,
  validatePayment: PropTypes.func.isRequired,
  intl: IntlPropType.isRequired,
};

export default injectIntl(PurchaseResult);
