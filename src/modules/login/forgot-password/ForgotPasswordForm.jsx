import React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';

import { Box, Button } from '@material-ui/core';

import { formatMessage, navigateTo } from '../../../helpers/helpers';
import paths from '../../../helpers/paths';
import renderTextField from '../../../utils/renderTextField';
import ButtonGroup from '../../../uiComponents/ButtonGroup';
import { required, email } from '../../../helpers/validation';

const ForgotPasswordForm = ({ handleSubmit, intl }) => (
  <form onSubmit={handleSubmit} autoComplete="off">
    <Box mt={4} mb={6}>
      <Field
        name="email"
        label={formatMessage(
          intl,
          'login.label.companyEmail',
          'Your company email',
        )}
        errorMessage={formatMessage(
          intl,
          'validations.invalid.email',
          'Enter valid email address',
        )}
        testId="input-resetEmail"
        component={renderTextField}
        validate={[required, email]}
      />
    </Box>
    <ButtonGroup inverse>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        data-testid="btn-resetPassword"
      >
        {formatMessage(
          intl,
          'forgotPassword.button.resetPassword',
          'Reset password',
        )}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        data-testid="btn-back"
        onClick={() => navigateTo(paths.common.login)}
      >
        {formatMessage(intl, 'forgotPassword.button.back', 'Back')}
      </Button>
    </ButtonGroup>
  </form>
);

ForgotPasswordForm.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const onSubmit = (values, _, props) => {
  props.forgotPassword(values.email);
};

const ForgotPasswordFormWrapper = reduxForm({
  destroyOnUnmount: false,
  onSubmit,
  form: 'forgot-password',
})(ForgotPasswordForm);

ForgotPasswordFormWrapper.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
};

export default injectIntl(ForgotPasswordFormWrapper);
