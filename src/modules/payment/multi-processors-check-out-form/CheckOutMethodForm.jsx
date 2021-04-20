import React, { useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Box, Button, Divider, makeStyles } from '@material-ui/core';

import {
  ADD_NEW_CARD,
  PAYMENT_CARD_FORM_NAME,
  PAYMENT_METHOD_CC_SEPARATOR,
} from '../constants';
import AddNewCard from '../AddNewCard';
import PaymentMethods from './MultiPaymentMethods';
import Typography from '../../../uiComponents/Typography';
import { orderType, extPaymentData } from '../../../types';
import { PAYMENT_METHODS } from '../../../constants/types';
import { formatMessage, formatAmount } from '../../../helpers/helpers';
import { IntlPropType } from '../../../i18n/lang';

let cachedSelectedPaymentMethod = '';
const useStyles = makeStyles(theme => ({
  footNote: {
    '& a': {
      color: theme.hyperlink,
      textDecoration: 'none',
      fontWeight: theme.typography.fontWeights.semiBold,
    },
  },
}));

const CheckOutMethodForm = ({
  intl,
  checkOutOrder,
  paymentMethods,
  order,
  extData,
  isLoadingPaymentMethods,
  callbackUrl,
}) => {
  const classes = useStyles();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedProcessor, setSelectedProcessor] = useState('');

  const onPaymentMethodChanged = useCallback((method, processor) => {
    cachedSelectedPaymentMethod = method;
    setSelectedProcessor(processor);
    setSelectedPaymentMethod(method);
  }, []);

  const getPostOrderData = () => {
    const { merchantOrderId, amount, currency, orderItems } = order;

    return {
      merchantOrderId,
      amount: {
        value: amount,
        currency,
      },
      orderItems,
    };
  };

  const getPaymentMethods = (sessionId, method) => {
    const selectedMethod = paymentMethods.find(p => p.paymentMethod === method);
    if (!selectedMethod) {
      return {
        payment: {
          paymentMethod: method,
          paymentProcessors: [],
        },
      };
    }
    const result = selectedMethod.paymentProcessors.map(processor => {
      const { name } = processor;
      const { value: amount, currency } = processor.amount;
      const instrumentId = selectedProcessor.replace(
        `${method}${PAYMENT_METHOD_CC_SEPARATOR}`,
        '',
      );
      const moreInfo =
        name === PAYMENT_METHODS.CREDIT_CARD
          ? {
              sessionId,
              instrumentId: parseInt(instrumentId, 10),
              redirectUrl: callbackUrl,
            }
          : {};

      return {
        name,
        amount: {
          value: parseFloat(amount),
          currency,
        },
        ...moreInfo,
      };
    });
    return {
      payment: {
        paymentMethod: method,
        paymentProcessors: result,
      },
    };
  };

  const checkOutBySelectedMethod = () => {
    const postOrder = {
      ...getPostOrderData(),
      ...getPaymentMethods(null, selectedPaymentMethod),
    };

    checkOutOrder(postOrder);
  };

  const checkOutByNewCard = sessionId => {
    const postOrder = {
      ...getPostOrderData(),
      ...getPaymentMethods(sessionId, cachedSelectedPaymentMethod),
    };

    checkOutOrder(postOrder);
  };

  const confirmPayment = () => {
    if (selectedProcessor.includes(ADD_NEW_CARD)) {
      window.PaymentSession.updateSessionFromForm(PAYMENT_CARD_FORM_NAME);
    } else {
      checkOutBySelectedMethod();
    }
  };

  const { amount, currency } = order;
  const hasCreditCardMethod = paymentMethods.find(
    m =>
      m.paymentMethod === PAYMENT_METHODS.CREDIT_CARD ||
      m.paymentMethod.startsWith(PAYMENT_METHODS.MIX_CREDIT_CARD),
  );

  return (
    <>
      <Box display="flex" mt={4}>
        <Typography type="style-9" color="highEmphasis">
          {formatMessage(intl, 'payment.checkout.label.title', 'Checkout')}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography type="style-11">
          {formatMessage(intl, 'payment.checkout.label.total', 'Order total')}
        </Typography>
        <Typography type="style-11" fontWeight="semiBold">
          {formatMessage(
            intl,
            'payment.checkout.label.amount',
            '{currency} {amount}',
            { amount: formatAmount(intl, amount), currency },
          )}
        </Typography>
      </Box>

      <Box mt={8}>
        <Divider light />
      </Box>

      <PaymentMethods
        paymentMethods={paymentMethods}
        onPaymentMethodChanged={onPaymentMethodChanged}
        selectedProcessor={selectedProcessor}
        extData={extData}
        order={order}
      />

      {hasCreditCardMethod && (
        <AddNewCard
          submitLabel={formatMessage(
            intl,
            'payment.checkout.button.confirm',
            'Confirm',
          )}
          submitEnrollInstrument={checkOutByNewCard}
          show={
            selectedProcessor.includes(ADD_NEW_CARD) && !isLoadingPaymentMethods
          }
          extData={extData}
          useFieldsOnly
        />
      )}

      {extData.paymentFootnote && (
        <Box mt={6} className={classes.footNote}>
          <Typography
            type="style-10"
            dangerouslySetInnerHTML={{
              __html: extData.paymentFootnote,
            }}
          />
        </Box>
      )}

      <Box display="flex" justifyContent="flex-start" mt={13}>
        <Button
          type="submit"
          data-testid="btn-submit-checkout"
          color="primary"
          variant="contained"
          onClick={confirmPayment}
          fullWidth
        >
          {formatMessage(intl, 'payment.checkout.button.confirm', 'Confirm')}
        </Button>
      </Box>
    </>
  );
};

CheckOutMethodForm.propTypes = {
  intl: IntlPropType.isRequired,
  paymentMethods: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  checkOutOrder: PropTypes.func.isRequired,
  order: orderType.isRequired,
  isLoadingPaymentMethods: PropTypes.bool.isRequired,
  extData: extPaymentData.isRequired,
  callbackUrl: PropTypes.string.isRequired,
};

export default compose(
  injectIntl,
  memo,
)(CheckOutMethodForm);
