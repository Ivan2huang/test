import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import { Box, Button } from '@material-ui/core';

import Grid from '../../../../../uiComponents/Grid';
import GridItem from '../../../../../uiComponents/GridItem';
import Typography from '../../../../../uiComponents/Typography';
import Images from '../../../../../constants/images';
import { formatMessage } from '../../../../../helpers/helpers';
import renderTextField from '../../../../../utils/renderTextField';
import validate from './validation';
import PendingEmailStatus from '../../PendingEmailStatus';

const ResendEmail = ({
  intl,
  profile,
  change,
  requestedEmail,
  handleSubmit,
}) => {
  useEffect(() => {
    change('newEmail', requestedEmail);
  }, [requestedEmail]);

  useEffect(() => {
    change('currentEmail', profile.email);
  }, [profile]);

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Box mt={{ md: 20 }} mb={12}>
        <Grid>
          <GridItem offset={{ xs: 0, md: 1 }} columns={{ md: 5 }}>
            <img src={Images.UPDATE_PERSONAL_EMAIL} alt="" />
          </GridItem>
          <GridItem columns={{ xs: 12, md: 6 }}>
            <Box mb={10}>
              <Typography type="style-1">
                {formatMessage(
                  intl,
                  'me.details.updateEmail.label.header',
                  'Change email address',
                )}
              </Typography>
            </Box>
            <Grid>
              <GridItem columns={{ xs: 12, md: 10 }}>
                <PendingEmailStatus />
              </GridItem>
              <GridItem columns={{ xs: 12, md: 10 }}>
                <Field
                  disabled
                  name="currentEmail"
                  label={formatMessage(
                    intl,
                    'me.details.updateEmail.label.currentEmail',
                    'Current email address',
                  )}
                  testId="input-currentEmail"
                  component={renderTextField}
                />
              </GridItem>
              <GridItem columns={{ xs: 12, md: 10 }}>
                <Field
                  name="newEmail"
                  label={formatMessage(
                    intl,
                    'me.details.updateEmail.label.newEmail',
                    'New email address',
                  )}
                  testId="input-newEmail"
                  component={renderTextField}
                />
              </GridItem>
              <GridItem columns={{ xs: 12, md: 12 }}>
                <Box display="flex" justifyContent="flex-start" mt={5} mb={10}>
                  <Button
                    type="submit"
                    data-testid="btn-submitResendEmail"
                    color="primary"
                    variant="contained"
                  >
                    {formatMessage(
                      intl,
                      'me.details.resendEmail.btn.submit',
                      'Resend email confirmation',
                    )}
                  </Button>
                </Box>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Box>
    </form>
  );
};

const onSubmit = (values, _, { intl, profile, changePersonalEmail }) => {
  const { email: currentEmail } = profile;

  const errorMessage = formatMessage(
    intl,
    'validations.duplicate.email',
    'Email already existed. Try a new email address',
  );

  return new Promise((resolve, reject) => {
    changePersonalEmail(currentEmail, values.newEmail, errorMessage, reject);
  });
};

ResendEmail.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({}).isRequired,
  requestedEmail: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};

const ResendFormWrapper = reduxForm({
  onSubmit,
  form: 'resend-personal-email-form',
  validate,
})(ResendEmail);

export default injectIntl(ResendFormWrapper);
