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
  } else if (required(values.confirmEmail) || email(values.confirmEmail)) {
    errors.confirmEmail = errorMessage;
  } else if (values.newEmail !== values.confirmEmail) {
    errors.confirmEmail = formatMessage(
      intl,
      'validations.notMatching.email',
      'Emails do not match',
    );
  }

  return errors;
};

export default validate;
