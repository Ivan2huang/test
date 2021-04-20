import React, { useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Box, Button, Divider, makeStyles } from '@material-ui/core';

import { ADD_NEW_CARD } from '../constants';
import AddNewCard from '../AddNewCard';
import PaymentMethods from '../PaymentMethods';
import Typography from '../../../uiComponents/Typography';
import {
  orderType,
  creditCardPaymentMethod,
  walletPaymentMethod,
} from '../../../types';
import { PAYMENT_METHODS } from '../../../constants/types';
import { formatMessage } from '../../../helpers/helpers';
import { ChevronLeftIcon } from '../../../icons';
import { IntlPropType } from '../../../i18n/lang';
import Disclaimer from '../Disclaimer';

const useStyles = makeStyles({
  link: {
    cursor: 'pointer',
  },
});

const CheckOutMethodForm = ({
  intl,
  checkOutOrder,
  goBack,
  paymentMethods,
  order,
  isLoadingPaymentMethods,
  showDisclaimer,
  addNewCardLabel,
}) => {
  const classes = useStyles();
  const [selectedCardId, setSelectedCardId] = useState('');

  const onCardChanged = useCallback(cardId => {
    setSelectedCardId(cardId);
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

  const getPaymentMethods = (sessionId, instrumentId) => {
    const result = paymentMethods.map(method => {
      const { paymentMethod } = method;
      const { value: amount, currency } = method.amount;
      const moreInfo =
        paymentMethod === PAYMENT_METHODS.CREDIT_CARD
          ? {
              sessionId,
              instrumentId,
              redirectUrl: order.redirectUrl,
            }
          : {};

      return {
        name: paymentMethod,
        amount: {
          value: parseFloat(amount),
          currency,
        },
        ...moreInfo,
      };
    });

    return {
      paymentMethods: result,
    };
  };

  const checkOutByExistingCard = () => {
    const postOrder = {
      ...getPostOrderData(),
      ...getPaymentMethods(null, selectedCardId),
    };

    checkOutOrder(postOrder);
  };

  const checkOutByNewCard = sessionId => {
    const postOrder = {
      ...getPostOrderData(),
      ...getPaymentMethods(sessionId, null),
    };

    checkOutOrder(postOrder);
  };

  const { amount, currency } = order;
  const hasCreditCardMethod = paymentMethods.find(
    m => m.paymentMethod === PAYMENT_METHODS.CREDIT_CARD,
  );
  const walletMethod = paymentMethods.find(
    m => m.paymentMethod === PAYMENT_METHODS.WALLET,
  );
  const isExistedCardSelected = selectedCardId !== ADD_NEW_CARD;
  const shouldShowPaymentButton = !hasCreditCardMethod || isExistedCardSelected;
  const isSufficient = !walletMethod || walletMethod.isSufficient;

  return (
    <>
      <Box display="flex" justifyContent="flex-start">
        <Box
          display="flex"
          mt={4}
          mb={9}
          ml={-6}
          onClick={goBack}
          className={classes.link}
        >
          <ChevronLeftIcon />
          <Typography>
            {formatMessage(intl, 'payment.checkout.label.back', 'Cart')}
          </Typography>
        </Box>
      </Box>
      <Typography type="style-5" fontWeight="bold">
        {formatMessage(intl, 'payment.checkout.label.title', 'Checkout')}
      </Typography>

      <Box display="flex" justifyContent="space-between">
        <Typography type="style-5">
          {formatMessage(intl, 'payment.checkout.label.total', 'Order total')}
        </Typography>
        <Typography type="style-5">
          {formatMessage(
            intl,
            'payment.checkout.label.amount',
            '{currency} {amount}',
            { amount, currency },
          )}
        </Typography>
      </Box>

      <Box mt={12}>
        <Divider light />
      </Box>

      <Box display="flex" justifyContent="flex-start" mt={12}>
        <Typography type="style-5" fontWeight="bold">
          {formatMessage(
            intl,
            'payment.checkout.label.method',
            'Payment method',
          )}
        </Typography>
      </Box>
      <PaymentMethods
        paymentMethods={paymentMethods}
        onCardChanged={onCardChanged}
        selectedCardId={selectedCardId}
      />
      {shouldShowPaymentButton && (
        <>
          <Box display="flex" justifyContent="flex-start" mt={14}>
            <Button
              type="submit"
              data-testid="btn-submit-checkout"
              color="primary"
              variant="contained"
              onClick={checkOutByExistingCard}
              disabled={!isSufficient}
              fullWidth
            >
              {formatMessage(intl, 'payment.checkout.button.payNow', 'Pay now')}
            </Button>
          </Box>
        </>
      )}

      {hasCreditCardMethod && (
        <AddNewCard
          submitLabel={
            addNewCardLabel ||
            formatMessage(intl, 'payment.checkout.button.payNow', 'Pay now')
          }
          submitEnrollInstrument={checkOutByNewCard}
          show={selectedCardId === ADD_NEW_CARD && !isLoadingPaymentMethods}
        />
      )}

      {showDisclaimer && (
        <Box mt={6}>
          <Disclaimer />
        </Box>
      )}
    </>
  );
};

CheckOutMethodForm.propTypes = {
  intl: IntlPropType.isRequired,
  paymentMethods: PropTypes.arrayOf(
    PropTypes.oneOfType([creditCardPaymentMethod, walletPaymentMethod]),
  ).isRequired,
  checkOutOrder: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  order: orderType.isRequired,
  isLoadingPaymentMethods: PropTypes.bool.isRequired,
  addNewCardLabel: PropTypes.string,
  showDisclaimer: PropTypes.bool,
};

CheckOutMethodForm.defaultProps = {
  showDisclaimer: false,
  addNewCardLabel: '',
};

export default compose(
  injectIntl,
  memo,
)(CheckOutMethodForm);
