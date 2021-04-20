import React, { useEffect, useState, memo, useCallback } from 'react';

import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';

import { Box, Button } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Typography from '../../uiComponents/Typography';
import AddNewCard from './AddNewCard';
import { instrumentType } from '../../types';
import { formatMessage } from '../../helpers/helpers';
import { ADD_NEW_CARD } from './constants';
import { IntlPropType } from '../../i18n/lang';

const AddCardForm = ({
  intl,
  instruments,
  preAuthInstrument,
  submitEnrollInstrument,
  isLoadingInstruments,
}) => {
  const [state, setState] = useState(0);

  useEffect(() => {
    setState(`${instruments[0].id}`);
  }, [instruments, setState, isLoadingInstruments]);

  const onChangeSession = useCallback(e => {
    setState(e.target.value);
  }, []);

  const onPreAuthInstrument = () => {
    preAuthInstrument(state);
  };

  const formatCardNumber = number => {
    const lastNumber = number.slice(-4);
    let maskedNumber = '';

    for (let i = 0; i < number.length - 4; i += 1) {
      maskedNumber += i % 4 === 3 ? '* ' : '*';
    }

    return `${maskedNumber} ${lastNumber}`;
  };

  return (
    <>
      <Typography type="style-6">
        {formatMessage(
          intl,
          'payment.paymentForm.information.description',
          'To verify the validity of your existing payment option, SGD$1.00 will be charged and refunded automatically for pre-authorisation of your credit card.',
        )}
      </Typography>

      <Box display="flex" justifyContent="flex-start" mt={4}>
        <Typography type="style-6">
          {formatMessage(
            intl,
            'payment.paymentForm.information.subDescription',
            'The total consultation fees will be sent to you after your consultation.',
          )}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="flex-start" mt={12}>
        <Typography type="style-5" fontWeight="bold">
          {formatMessage(
            intl,
            'payment.paymentForm.paymentMethod.label',
            'Payment method',
          )}
        </Typography>
      </Box>

      {instruments.length > 1 && (
        <FormControl component="fieldset">
          <RadioGroup
            name="select-card"
            value={state}
            onChange={onChangeSession}
          >
            {instruments.map(item => (
              <FormControlLabel
                key={`${item.id}`}
                value={`${item.id}`}
                control={<Radio color="secondary" />}
                label={
                  item.id !== ADD_NEW_CARD
                    ? formatCardNumber(item.card.maskedCreditCardNumber)
                    : item.card.maskedCreditCardNumber
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}

      {instruments.length > 1 && state !== ADD_NEW_CARD && (
        <Box display="flex" justifyContent="flex-start" mt={14}>
          <Button
            type="submit"
            data-testid="btn-submit-preauth"
            color="primary"
            variant="contained"
            onClick={onPreAuthInstrument}
          >
            {formatMessage(intl, 'payment.paymentForm.button.next', 'Next')}
          </Button>
        </Box>
      )}

      <AddNewCard
        submitEnrollInstrument={submitEnrollInstrument}
        show={state === ADD_NEW_CARD && !isLoadingInstruments}
      />
    </>
  );
};

AddCardForm.propTypes = {
  instruments: PropTypes.arrayOf(instrumentType).isRequired,
  intl: IntlPropType.isRequired,
  preAuthInstrument: PropTypes.func.isRequired,
  submitEnrollInstrument: PropTypes.func.isRequired,
  isLoadingInstruments: PropTypes.bool.isRequired,
};

export default compose(
  injectIntl,
  memo,
)(AddCardForm);
