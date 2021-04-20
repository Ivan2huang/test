import { required } from '../../../../../helpers/validation';
import { formatMessage } from '../../../../../helpers/helpers';

const validate = (values, { intl }) => {
  const errors = {};
  const {
    newMobileNumberCountryCode,
    newMobileNumber,
    confirmNewMobileNumberCountryCode,
    confirmNewMobileNumber,
  } = values;

  if (required(newMobileNumber) || required(newMobileNumberCountryCode)) {
    errors.newMobileNumber = formatMessage(
      intl,
      'validations.invalid.phoneNumber',
      'Enter valid mobile number',
    );
  } else if (
    required(confirmNewMobileNumber) ||
    required(confirmNewMobileNumberCountryCode)
  ) {
    errors.confirmNewMobileNumber = formatMessage(
      intl,
      'validations.invalid.phoneNumber',
      'Enter valid mobile number',
    );
  } else if (newMobileNumber !== confirmNewMobileNumber) {
    errors.confirmNewMobileNumber = formatMessage(
      intl,
      'validations.notMatching.phoneNumber',
      'Phone numbers do not match',
    );
  } else if (newMobileNumberCountryCode !== confirmNewMobileNumberCountryCode) {
    errors.confirmNewMobileNumberCountryCode = formatMessage(
      intl,
      'validations.notMatching.phoneCode',
      'Country code does not match',
    );
  }

  return errors;
};

export default validate;
