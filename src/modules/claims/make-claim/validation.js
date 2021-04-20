import { formatAmount } from '../../../helpers/helpers';

const getAmount = value => (value ? parseFloat(value.replace(',', '')) : 0);

export const validateAnotherInsurerAmount = (value, values) => {
  if (+value === 0) {
    return {
      id: 'claims.makeClaimForm.validations.greaterThanZero.otherInsurerAmount',
      defaultMessage: 'Amount should be greater than 0',
    };
  }
  if (getAmount(value) >= getAmount(values.claim.receiptAmount)) {
    return {
      id: 'claims.makeClaimForm.otherInsurerAmount.helperText',
      defaultMessage: 'Must be lower than receipt amount',
    };
  }

  return '';
};

export const validateReceiptAmount = (value, _, props) => {
  const { maxReceiptAmount, intl } = props;
  if (+value === 0) {
    return {
      id: 'claims.makeClaimForm.validations.greaterThanZero.receiptAmount',
      defaultMessage: 'Amount should be greater than 0',
    };
  }
  if (getAmount(value) > maxReceiptAmount) {
    const formattedAmount = formatAmount(intl, maxReceiptAmount);
    return {
      id: 'claims.makeClaimForm.validations.max.receiptAmount',
      defaultMessage: `For amounts above HK$ ${formattedAmount} submit a physical claim forms`,
      values: {
        maxReceiptAmount: formattedAmount,
      },
    };
  }

  return '';
};

export const validate = (values, props) => {
  const errors = {};

  if (values.receipts.files.length === 0) {
    errors.receipts = {};
    errors.receipts.files = {
      _error: true,
    };
  }

  if (props.referralRequired && values.referral.files.length === 0) {
    errors.referral = {};
    errors.referral.files = {
      _error: true,
    };
  }

  if (
    props.anotherInsurerEnabled &&
    values.settlementAdvices.files.length === 0
  ) {
    errors.settlementAdvices = {};
    errors.settlementAdvices.files = {
      _error: true,
    };
  }

  if (props.isChineseHerbalist && values.prescriptions.files.length === 0) {
    errors.prescriptions = {};
    errors.prescriptions.files = {
      _error: true,
    };
  }

  return errors;
};
