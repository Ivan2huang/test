/* eslint-disable react/button-has-type */
import React, { useEffect, memo, useState, useMemo } from 'react';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

import { withStyles, Box, Button, Hidden } from '@material-ui/core';

import GridItem from '../../uiComponents/GridItem';
import Grid from '../../uiComponents/Grid';
import Typography from '../../uiComponents/Typography';
import { PAYMENT_CARD_FORM_NAME, PAYMENT_FORM } from './constants';
import { formatMessage } from '../../helpers/helpers';
import { MasterCardIcon, VisaCardIcon } from '../../icons';

const Styles = theme => ({
  input: {
    width: '100%',
    height: 56,
    borderWidth: 1,
    borderColor: '#9e9e9e',
    boxSizing: 'border-box',
    borderRadius: theme.borderRadiusX(1),
    borderStyle: 'solid',
    padding: 16,
    marginTop: theme.spacingX(6),
    color: '#212121',
    fontSize: 16,
    letterSpacing: '0.3',
  },
  error: {
    color: '#A8000B',
    // fontFamily: 'Arial',
  },
});

const iconStyles = {
  width: 20,
  height: 16,
  paddingLeft: 8,
};

const AddNewCardForm = ({
  intl,
  classes,
  show,
  useFieldsOnly,
  submitEnrollInstrument,
  submitLabel,
}) => {
  const [errors, setErrors] = useState({});

  const errorMessage = useMemo(
    () => ({
      cardNumber: formatMessage(
        intl,
        'payment.addNewCard.label.cardInvalidOrMissing',
        'Card number invalid or missing.',
      ),
      expiryMonth: formatMessage(
        intl,
        'payment.addNewCard.label.expiryMonthInvalidOrMissing',
        'Expiry month invalid or missing.',
      ),
      expiryYear: formatMessage(
        intl,
        'payment.addNewCard.label.expiryYearInvalidOrMissing',
        'Expiry year invalid or missing.',
      ),
      securityCode: formatMessage(
        intl,
        'payment.addNewCard.label.securityCodeInvalidOrMissing',
        'Security code invalid or missing.',
      ),
    }),
    [],
  );

  useEffect(() => {
    window.PaymentSession.configure({
      fields: {
        // ATTACH HOSTED FIELDS TO YOUR PAYMENT PAGE FOR A CREDIT CARD
        [PAYMENT_CARD_FORM_NAME]: {
          number: '#cardNumber',
          securityCode: '#securityCode',
          expiryMonth: '#expiryMonth',
          expiryYear: '#expiryYear',
        },
      },
      // SPECIFY YOUR MITIGATION OPTION HERE
      frameEmbeddingMitigation: ['javascript'],
      callbacks: {
        formSessionUpdate: response => {
          // HANDLE RESPONSE FOR UPDATE SESSION
          if (response.status) {
            if (response.status === 'ok') {
              submitEnrollInstrument(response.session.id);
            } else if (response.status === 'fields_in_error') {
              setErrors(response.errors);
            }
          }
        },
      },
      interaction: {
        displayControl: {
          formatCard: 'EMBOSSED',
          invalidFieldCharacters: 'REJECT',
        },
      },
    });
  }, []);

  const onAddNewCard = () => {
    window.PaymentSession.updateSessionFromForm(PAYMENT_CARD_FORM_NAME);
  };

  return (
    <Hidden xlDown={!show} implementation="css">
      {!useFieldsOnly && (
        <>
          <Typography type="style-6" fontWeight="bold">
            {formatMessage(
              intl,
              'payment.paymentForm.creditCardInformation.label',
              'Credit card information',
            )}
          </Typography>

          <Box display="flex" justifyContent="flex-start" mt={8}>
            <Typography type="style-8">
              {formatMessage(
                intl,
                'payment.paymentForm.supportedCards.label',
                'Supported Cards',
              )}
            </Typography>
            <MasterCardIcon style={iconStyles} />
            <VisaCardIcon style={iconStyles} />
          </Box>
        </>
      )}
      <Grid>
        {Object.keys(PAYMENT_FORM).map(key => {
          const config = PAYMENT_FORM[key];
          const placeholder = formatMessage(
            intl,
            `payment.paymentForm.${key}.label`,
            config.defaultPlaceholder,
          );

          return (
            <GridItem key={key} columns={config.gridColumns}>
              <div>
                <input
                  id={key}
                  type={config.inputType ? config.inputType : 'text'}
                  className={classes.input}
                  readOnly
                  placeholder={placeholder}
                />
              </div>
              {errors && errors[key] ? (
                <Typography type="style-8" color="error">
                  {errorMessage[key]}
                </Typography>
              ) : null}
            </GridItem>
          );
        })}

        {!useFieldsOnly && (
          <GridItem columns={{ xs: 12, md: 12 }}>
            <Box display="flex" justifyContent="flex-start" mt={10}>
              <Button
                type="submit"
                data-testid="btn-submit-card"
                color="primary"
                variant="contained"
                onClick={onAddNewCard}
                fullWidth
              >
                {submitLabel ||
                  formatMessage(
                    intl,
                    'payment.paymentForm.button.next',
                    'Next',
                  )}
              </Button>
            </Box>
          </GridItem>
        )}
      </Grid>
    </Hidden>
  );
};

AddNewCardForm.propTypes = {
  show: PropTypes.bool,
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({
    input: PropTypes.string.isRequired,
  }).isRequired,
  submitEnrollInstrument: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  useFieldsOnly: PropTypes.bool,
};

AddNewCardForm.defaultProps = {
  show: false,
  submitLabel: '',
  useFieldsOnly: false,
};

export default compose(
  injectIntl,
  memo,
  withStyles(Styles),
)(AddNewCardForm);
