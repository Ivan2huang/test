import React from 'react';
import { useIntl } from 'react-intl';
import DefaultCheckOutMethodForm from './CheckOutMethodForm';
import { formatMessage } from '../../../helpers/helpers';

const CheckOutMethodForm = props => {
  const intl = useIntl();

  return (
    <DefaultCheckOutMethodForm
      {...props}
      showDisclaimer
      addNewCardLabel={formatMessage(
        intl,
        'payment.checkout.button.saveAndPay',
        'Save and Pay now',
      )}
    />
  );
};

export default CheckOutMethodForm;
