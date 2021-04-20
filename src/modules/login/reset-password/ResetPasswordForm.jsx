import React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';

import { Box, Button, makeStyles } from '@material-ui/core';

import { required, password } from '../../../helpers/validation';
import { formatMessage } from '../../../helpers/helpers';
import renderPasswordField from '../../../utils/renderPasswordField';
import ButtonGroup from '../../../uiComponents/ButtonGroup';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(0.5),
      backgroundColor: theme.background,
    },
  },
}));

export const matchNewPassword = (value, allValues) =>
  value !== allValues.new_password;

const ResetPasswordForm = ({ intl, handleSubmit, isFirstTimeUser }) => {
  const classes = useStyles();
  const requiredPassword = (...props) =>
    required(...props) && 'password.validations.required';

  const matchPassword = (...props) =>
    matchNewPassword(...props) && 'password.validations.match';

  const compliantPassword = (...props) =>
    password(...props) && 'password.validations.compliance';

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className={classes.root}>
      <Box mt={4} mb={6}>
        <Field
          name="new_password"
          label={formatMessage(
            intl,
            'login.resetPassword.label.newPassword',
            'New password',
          )}
          testId="input-new-password"
          component={renderPasswordField}
          validate={[requiredPassword, compliantPassword]}
        />
        <Field
          name="confirm_new_password"
          label={formatMessage(
            intl,
            'login.resetPassword.label.confirmPassword',
            'Confirm password',
          )}
          testId="input-confirm-password"
          component={renderPasswordField}
          validate={[requiredPassword, matchPassword]}
        />
      </Box>
      <ButtonGroup inverse>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          data-testid="btn-submit-password"
        >
          {isFirstTimeUser
            ? formatMessage(
                intl,
                'login.resetPassword.onBoarding.button.submit',
                'Set up',
              )
            : formatMessage(
                intl,
                'login.resetPassword.button.submit',
                'Submit',
              )}
        </Button>
      </ButtonGroup>
    </form>
  );
};

const onSubmit = (values, _, props) => {
  props.resetPassword(
    props.email,
    values.new_password,
    props.token,
    props.isFirstTimeUser,
    props.productName,
    props.clientId,
  );
};

ResetPasswordForm.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isFirstTimeUser: PropTypes.bool.isRequired,
  dateOfBirthMatch: PropTypes.shape({}),
  // eslint-disable-next-line react/no-unused-prop-types
  productName: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  clientId: PropTypes.string.isRequired,
};

ResetPasswordForm.defaultProps = {
  dateOfBirthMatch: {},
  productName: '',
};

const ResetPasswordFormWrapper = reduxForm({
  destroyOnUnmount: false,
  form: 'reset-password',
  onSubmit,
})(ResetPasswordForm);

export default injectIntl(ResetPasswordFormWrapper);
