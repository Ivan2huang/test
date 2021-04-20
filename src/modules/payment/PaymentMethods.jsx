import React, { useEffect, useCallback, memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import get from 'lodash/get';

import { withStyles, Box } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

import { ADD_NEW_CARD } from './constants';
import CheckOutMethodRow from './CheckOutMethodRow';
import CardList from './CardList';
import { PAYMENT_METHODS } from '../../constants/types';
import { creditCardPaymentMethod, walletPaymentMethod } from '../../types';
import { DollarIcon, CreditCardIcon, AlertIcon } from '../../icons';
import { formatMessage } from '../../helpers/helpers';
import Typography from '../../uiComponents/Typography';
import { IntlPropType } from '../../i18n/lang';

const styles = theme => ({
  error: {
    borderRadius: theme.borderRadiusX(1),
    backgroundColor: fade(theme.error, 0.1),
  },
});

const PaymentMethods = ({
  intl,
  classes,
  paymentMethods,
  selectedCardId,
  onCardChanged,
}) => {
  useEffect(() => {
    const creditCardMethod = paymentMethods.find(
      m => m.paymentMethod === PAYMENT_METHODS.CREDIT_CARD,
    );
    const firstCardId = get(creditCardMethod, ['cards', '0', 'id']);
    onCardChanged(`${firstCardId || ADD_NEW_CARD}`);
  }, [paymentMethods]);

  const newCard = {
    id: ADD_NEW_CARD,
    card: {
      maskedCreditCardNumber: formatMessage(
        intl,
        'payment.checkout.label.newCard',
        'New card',
      ),
    },
  };

  const cardChanged = useCallback(e => {
    onCardChanged(e.target.value);
  }, []);

  const hasWalletMethod = paymentMethods.find(
    m => m.paymentMethod === PAYMENT_METHODS.WALLET,
  );

  const payByCreditCardLabel = hasWalletMethod
    ? formatMessage(
        intl,
        'payment.checkout.label.topUpByCreditCard',
        'Top up by credit card',
      )
    : formatMessage(
        intl,
        'payment.checkout.label.payByCreditCard',
        'Pay by credit card',
      );

  const paymentMethodsInfo = {
    [PAYMENT_METHODS.WALLET]: {
      icon: <DollarIcon />,
      label: formatMessage(
        intl,
        'payment.checkout.label.payFromWallet',
        'Pay from wallet',
      ),
    },
    [PAYMENT_METHODS.CREDIT_CARD]: {
      icon: <CreditCardIcon />,
      label: payByCreditCardLabel,
    },
    [PAYMENT_METHODS.MOCK]: {
      icon: <CreditCardIcon />,
      label: formatMessage(
        intl,
        'payment.checkout.label.mock',
        'Pay from mock data',
      ),
    },
  };

  return (
    <>
      {paymentMethods.map(paymentMethod => {
        const {
          paymentMethod: method,
          amount: { value: amount, currency },
          isSufficient,
          cards,
        } = paymentMethod;
        const { icon, label } = paymentMethodsInfo[method];
        const showInsufficientMessage =
          method === PAYMENT_METHODS.WALLET && !isSufficient;

        return (
          <Fragment key={method}>
            {showInsufficientMessage && (
              <Box className={classes.error} p={4} mt={6} display="flex">
                <Box mr={3}>
                  <AlertIcon size={24} />
                </Box>
                <Typography type="style-5">
                  {formatMessage(
                    intl,
                    'payment.checkout.message.insufficientBalance',
                    'Insufficient wallet balance. Please select another item.',
                  )}
                </Typography>
              </Box>
            )}
            <CheckOutMethodRow
              icon={icon}
              label={label}
              amount={formatMessage(
                intl,
                'payment.checkout.label.amount',
                '{currency} {amount}',
                { amount, currency },
              )}
            />
            {cards && (
              <CardList
                cards={[...cards, newCard]}
                selectedCardId={selectedCardId}
                onCardChanged={cardChanged}
              />
            )}
          </Fragment>
        );
      })}
    </>
  );
};

PaymentMethods.propTypes = {
  intl: IntlPropType.isRequired,
  classes: PropTypes.exact({
    error: PropTypes.string.isRequired,
  }).isRequired,
  selectedCardId: PropTypes.string.isRequired,
  paymentMethods: PropTypes.arrayOf(
    PropTypes.oneOfType([creditCardPaymentMethod, walletPaymentMethod]),
  ).isRequired,
  onCardChanged: PropTypes.func.isRequired,
};

export default compose(
  injectIntl,
  withStyles(styles),
  memo,
)(PaymentMethods);
