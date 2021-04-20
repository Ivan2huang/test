import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import partition from 'lodash/partition';

import {
  withStyles,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { ADD_NEW_CARD, PAYMENT_METHOD_CC_SEPARATOR } from '../constants';
import { PAYMENT_METHODS } from '../../../constants/types';
import { extPaymentData, orderType } from '../../../types';
import { formatMessage } from '../../../helpers/helpers';
import Typography from '../../../uiComponents/Typography';
import { IntlPropType } from '../../../i18n/lang';
import { maskingCreditCardNumber } from '../util';
import { MasterCardIcon, VisaCardIcon, AmexCardIcon } from '../../../icons';
import WalletSection from './WalletSection';

const iconStyles = {
  width: 20,
  height: 16,
  paddingRight: 3,
};

const styles = theme => ({
  processor: {
    marginBottom: '0px',
    '& label': {
      alignItems: 'flex-start',
      marginBottom: theme.spacingX(3),
      '& > span:last-child': {
        paddingTop: theme.spacingX(2),
      },
    },
  },
});

const PaymentMethods = ({
  intl,
  classes,
  paymentMethods,
  extData,
  order,
  selectedProcessor,
  onPaymentMethodChanged,
}) => {
  const [singleMethods, setSingleMethods] = useState([]);
  const [mixMethods, setMixMethods] = useState([]);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState({
    paymentMethod: '',
    paymentProcessors: [],
    instrumentId: '',
  });

  useEffect(() => {
    if (extData && paymentMethods) {
      const [mix, single] = partition(paymentMethods, method =>
        method.paymentMethod.startsWith(PAYMENT_METHODS.MIX_WALLET),
      );
      setSingleMethods(single);
      setMixMethods(mix);
      if (mix && mix.length > 0) {
        setSelectedMethods(mix);
      } else {
        setSelectedMethods(single);
      }
    }
  }, [paymentMethods, extData]);

  useEffect(() => {
    if (selectedMethods && selectedMethods.length > 0) {
      const firstMethod = selectedMethods[0];
      const { cards } =
        firstMethod.paymentProcessors.find(
          p => p.name !== PAYMENT_METHODS.WALLET,
        ) || {};
      let selectedCardId = '';
      if (cards) {
        if (cards.length > 0) {
          selectedCardId = cards[0].instrumentId;
        } else {
          selectedCardId = ADD_NEW_CARD;
        }
        selectedCardId = `${PAYMENT_METHOD_CC_SEPARATOR}${selectedCardId}`;
      }

      onPaymentMethodChanged(
        firstMethod.paymentMethod,
        `${firstMethod.paymentMethod}${selectedCardId}`,
      );
    }
  }, [selectedMethods]);

  useEffect(() => {
    if (selectedProcessor && selectedMethods) {
      const method = selectedMethods.find(m =>
        selectedProcessor.startsWith(m.paymentMethod),
      );
      if (method) {
        setSelectedMethod(method);
      }
    }
  }, [selectedProcessor]);

  const onWalletSwitch = e => {
    setSelectedMethods(e.target.checked ? mixMethods : singleMethods);
  };

  const renderProcessorLabel = (processorName, subText) => {
    return (
      <>
        <Typography type="style-12">
          {formatMessage(
            intl,
            `payment.checkout.label.processor.${processorName}`,
            `Pay by ${processorName}`,
          )}
        </Typography>
        {subText}
      </>
    );
  };

  const renderMethodRow = method => {
    const { paymentMethod, paymentProcessors } = method;
    const notWalletProcessors = paymentProcessors.filter(
      p => p.name !== PAYMENT_METHODS.WALLET,
    );
    let hasCreditCard = false;
    return (
      <FormControl
        className={classes.processor}
        component="fieldset"
        key={paymentMethod}
      >
        <RadioGroup
          name="payment-method"
          value={`${selectedProcessor}`}
          onChange={(_, value) => onPaymentMethodChanged(paymentMethod, value)}
          data-testid="payment-method"
        >
          {notWalletProcessors.map(({ name, cards }) => {
            if (name === PAYMENT_METHODS.CREDIT_CARD) {
              hasCreditCard = true;
              return cards.map(card => (
                <FormControlLabel
                  key={`${card.instrumentId}`}
                  data-testid={`card_${card.instrumentId}`}
                  value={`${paymentMethod}${PAYMENT_METHOD_CC_SEPARATOR}${card.instrumentId}`}
                  control={<Radio color="secondary" />}
                  label={renderProcessorLabel(
                    paymentMethod,
                    <Typography type="style-10">
                      {card.id !== ADD_NEW_CARD
                        ? maskingCreditCardNumber(card.maskedCreditCardNumber)
                        : card.maskedCreditCardNumber}
                    </Typography>,
                  )}
                />
              ));
            }
            return (
              <FormControlLabel
                value={`${paymentMethod}`}
                control={<Radio color="secondary" />}
                label={renderProcessorLabel(paymentMethod)}
              />
            );
          })}
          {hasCreditCard && (
            <FormControlLabel
              value={`${paymentMethod}${PAYMENT_METHOD_CC_SEPARATOR}${ADD_NEW_CARD}`}
              control={<Radio color="secondary" />}
              label={renderProcessorLabel(
                ADD_NEW_CARD,
                <>
                  <MasterCardIcon style={iconStyles} />
                  <AmexCardIcon style={iconStyles} />
                  <VisaCardIcon style={iconStyles} />
                </>,
              )}
            />
          )}
        </RadioGroup>
      </FormControl>
    );
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-start" my={8}>
        <Typography type="style-9" color="highEmphasis">
          {formatMessage(
            intl,
            'payment.checkout.label.method',
            'Payment method',
          )}
        </Typography>
      </Box>
      <WalletSection
        selectedMethod={selectedMethod}
        mixMethods={mixMethods}
        onWalletSwitch={onWalletSwitch}
        extData={extData}
        order={order}
      />
      {selectedMethods.map(renderMethodRow)}
    </>
  );
};

PaymentMethods.propTypes = {
  intl: IntlPropType.isRequired,
  classes: PropTypes.shape({
    processor: PropTypes.string.isRequired,
  }).isRequired,
  selectedProcessor: PropTypes.string.isRequired,
  paymentMethods: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onPaymentMethodChanged: PropTypes.func.isRequired,
  extData: extPaymentData.isRequired,
  order: orderType.isRequired,
};

export default compose(
  injectIntl,
  withStyles(styles),
  memo,
)(PaymentMethods);
