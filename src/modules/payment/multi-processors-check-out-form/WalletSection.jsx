import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

import { withStyles, Box, Divider } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import { PAYMENT_METHODS } from '../../../constants/types';
import { extPaymentData, orderType } from '../../../types';
import { formatMessage, formatAmount } from '../../../helpers/helpers';
import Typography from '../../../uiComponents/Typography';
import Switch from '../../../uiComponents/Switch';
import { IntlPropType } from '../../../i18n/lang';
import { Waring } from '../../../icons';

const styles = theme => ({
  infoText: {
    borderRadius: theme.borderRadiusX(1),
    backgroundColor: fade(theme.warning, 0.1),
  },
});

const WalletSection = ({
  intl,
  classes,
  selectedMethod,
  mixMethods,
  onWalletSwitch,
  extData,
  order,
}) => {
  const currentWallet =
    selectedMethod.paymentProcessors.find(
      p => p.name === PAYMENT_METHODS.WALLET,
    ) || {};
  if (!currentWallet && mixMethods.length <= 0) return <></>;

  const {
    amount: {
      value: currentWalletAmount = 0,
      currency: currentWalletCurrency = '',
    } = {},
  } = currentWallet;
  const { amount: { value: amount = 0, currency = '' } = {} } =
    selectedMethod.paymentProcessors.find(
      p => p.name !== PAYMENT_METHODS.WALLET,
    ) || {};
  const infoText =
    order.balance >= order.maxWalletAmount
      ? extData.paymentInstructionSufficient
      : extData.paymentInstructionInsufficient;

  return (
    <>
      <Box>
        {infoText && (
          <Box className={classes.infoText} p={4} mt={6} mb={10} display="flex">
            <Box mr={3}>
              <Waring size={24} />
            </Box>
            <Typography
              type="style-11"
              dangerouslySetInnerHTML={{
                __html: infoText,
              }}
            />
          </Box>
        )}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography type="style-12" fontWeight="semiBold">
            {formatMessage(
              intl,
              'payment.checkout.label.useWallet',
              'Use my wallet',
            )}
          </Typography>
          {extData.allowPayOptionWithoutWallet && (
            <Switch onChange={onWalletSwitch} defaultChecked />
          )}
        </Box>
        <Box display="flex" justifyContent="space-between" mb={8}>
          <Typography type="style-10">
            {formatMessage(
              intl,
              'payment.checkout.label.availableWallet',
              'Available balance',
            )}
            <Typography type="style-10" component="span">
              {' '}
              {formatMessage(
                intl,
                'payment.checkout.label.amount',
                '{currency} {amount}',
                {
                  amount: formatAmount(intl, order.balance),
                  currency: order.balanceCurrency,
                },
              )}
            </Typography>
          </Typography>
          <Typography
            type="style-10"
            color="highEmphasis"
            fontWeight="semiBold"
          >
            {formatMessage(
              intl,
              'payment.checkout.label.amount',
              '{currency} {amount}',
              {
                amount: formatAmount(intl, currentWalletAmount),
                currency: currentWalletCurrency || order.balanceCurrency,
              },
            )}
          </Typography>
        </Box>
      </Box>
      <Divider light />
      {amount > 0 && (
        <Box display="flex" justifyContent="space-between" mb={2} mt={8}>
          <Typography type="style-12" fontWeight="semiBold">
            {formatMessage(
              intl,
              'payment.checkout.label.remaining',
              'Remaining to be paid',
            )}
          </Typography>
          <Typography
            type="style-10"
            color="highEmphasis"
            fontWeight="semiBold"
          >
            {formatMessage(
              intl,
              'payment.checkout.label.amount',
              '{currency} {amount}',
              { amount: formatAmount(intl, amount), currency },
            )}
          </Typography>
        </Box>
      )}
    </>
  );
};

WalletSection.propTypes = {
  intl: IntlPropType.isRequired,
  classes: PropTypes.shape({
    infoText: PropTypes.string.isRequired,
  }).isRequired,
  mixMethods: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedMethod: PropTypes.shape({}).isRequired,
  onWalletSwitch: PropTypes.func.isRequired,
  extData: extPaymentData.isRequired,
  order: orderType.isRequired,
};

export default compose(
  injectIntl,
  withStyles(styles),
  memo,
)(WalletSection);
