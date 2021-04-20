import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Box, Card, CardContent } from '@material-ui/core';
import Loading from '../Loading';

const PaymentResult = ({ paRes, MD, validateInstrument, intl }) => {
  useEffect(() => {
    validateInstrument(paRes, MD);
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
                id: 'payment.paymentResult.result.title',
                defaultMessage:
                  'Your payment method is being verified, please do not exit this screen.',
              })}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

PaymentResult.defaultProps = {
  paRes: '',
  MD: '',
};

PaymentResult.propTypes = {
  paRes: PropTypes.string,
  MD: PropTypes.string,
  validateInstrument: PropTypes.func.isRequired,
  intl: PropTypes.shape({}).isRequired,
};

export default injectIntl(PaymentResult);
