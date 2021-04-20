import { required, email } from '../../../../../helpers/validation';
import { formatMessage } from '../../../../../helpers/helpers';

const validate = (values, { intl }) => {
  const errors = {};
  const errorMessage = formatMessage(
    intl,
    'validations.invalid.email',
    'Enter valid email address',
  );

  if (required(values.newEmail) || email(values.newEmail)) {
    errors.newEmail = errorMessage;
  }

  return errors;
};

export default validate;
