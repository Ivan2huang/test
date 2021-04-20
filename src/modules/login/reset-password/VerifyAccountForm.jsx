import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';

import { Box, Button, withStyles } from '@material-ui/core';
import moment from 'moment';
import { required } from '../../../helpers/validation';
import { formatMessage } from '../../../helpers/helpers';
import renderDatePicker from '../../../utils/renderDatePicker';
import Typography from '../../../uiComponents/Typography';

const styles = theme => ({
  dateOfBirth: ({ dateOfBirthMatch }) => {
    const isError = dateOfBirthMatch && dateOfBirthMatch.errorState;
    return {
      '& label[for=input-dateOfBirth]': {
        paddingLeft: isError ? theme.spacing(1) : 0,
        paddingRight: isError ? theme.spacing(0.5) : 0,
        backgroundColor: theme.background,
      },
    };
  },
});

const VerifyAccountForm = ({
  classes,
  intl,
  handleSubmit,
  change,
  setFormErrorIfDateOfBirthNoMatch,
  dateOfBirthMatch,
}) => {
  useEffect(() => {
    if (dateOfBirthMatch && dateOfBirthMatch.errorState) {
      setFormErrorIfDateOfBirthNoMatch({
        formName: 'verify-dob',
        fieldName: 'dateOfBirth',
      });
    }
  }, [dateOfBirthMatch]);

  const onDateOfBirthChange = date => {
    change('verify-dob.dateOfBirth', date);
  };

  const DateOfBirthMaximum = () => {
    return new Date();
  };

  const DateOfBirthMinimum = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 110);
    return date;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={4}>
        <Typography type="style-1">
          {formatMessage(
            intl,
            'login.verifyAccount.header.title',
            'Verify your account',
          )}
        </Typography>
      </Box>
      <Box mt={4} mb={6} className={classes.dateOfBirth}>
        <Field
          name="dateOfBirth"
          label={formatMessage(
            intl,
            'login.resetPassword.label.dateOfBirth',
            'Date of Birth',
          )}
          testId="input-dateofbirth"
          errorMessage={
            dateOfBirthMatch && dateOfBirthMatch.errorState === true
              ? formatMessage(
                  intl,
                  'dateofBirth.validations.dateOfBirthNoMatch',
                  'Unsuccessfully verified, please try again.',
                )
              : formatMessage(
                  intl,
                  'dateofBirth.validations.required',
                  'Enter date of birth',
                )
          }
          minDate={DateOfBirthMinimum()}
          maxDate={DateOfBirthMaximum()}
          onChange={onDateOfBirthChange}
          component={renderDatePicker}
          validate={[required]}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" flexDirection="row">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          data-testid="btn-verify-dob"
        >
          {formatMessage(intl, 'login.resetPassword.button.verify', 'Verify')}
        </Button>
      </Box>
    </form>
  );
};

const onSubmit = (values, _, props) => {
  const isVerifyingDoB = true;
  const dateStr = moment(values.dateOfBirth).format('YYYY-MM-DD');
  const dateOfBirth = moment.utc(dateStr).format();
  props.verifyDoB(
    props.email,
    dateOfBirth,
    props.token,
    props.clientId,
    isVerifyingDoB,
  );
};

VerifyAccountForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  setFormErrorIfDateOfBirthNoMatch: PropTypes.func.isRequired,
  dateOfBirthMatch: PropTypes.shape({}),
};

VerifyAccountForm.defaultProps = {
  dateOfBirthMatch: {},
};

const VerifyAccountFormWrapper = reduxForm({
  destroyOnUnmount: true,
  form: 'verify-dob',
  onSubmit,
})(VerifyAccountForm);

export default injectIntl(withStyles(styles)(VerifyAccountFormWrapper));
