/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'next/router';
import { injectIntl } from 'react-intl';

import { Box, Button } from '@material-ui/core';

import { formatMessage, navigateTo } from '../../../helpers/helpers';
import paths from '../../../helpers/paths';
import ButtonGroup from '../../../uiComponents/ButtonGroup';
import Typography from '../../../uiComponents/Typography';

const ForgotPasswordSuccessContent = ({
  intl,
  router,
  forgotPassword,
  showBackBtn,
}) => {
  const { email, verify } = router.query;
  const isFirstLogin = String(verify).toLowerCase();
  return (
    <>
      <Box>
        <Typography type="style-1">
          {formatMessage(
            intl,
            'forgotPasswordSuccess.Header.title',
            'Check your email',
          )}
        </Typography>
      </Box>
      <Box mt={4}>
        <Typography type="style-6">
          {formatMessage(
            intl,
            'forgotPasswordSuccess.Header.description-yes',
            `We've sent the reset password link to ${email}. If you don't see the email, check your junk or spam folders.`,
            { email },
          )}
        </Typography>
      </Box>
      <Box mt={4}>
        <ButtonGroup>
          {showBackBtn && (
            <Button
              variant="contained"
              color="primary"
              data-testid="btn-back-to-login"
              onClick={() => navigateTo(paths.common.login)}
            >
              {formatMessage(
                intl,
                'forgotPasswordSuccess.button.backToLogin',
                'Back to log in',
              )}
            </Button>
          )}
          <Button
            variant="outlined"
            color="secondary"
            data-testid="btn-resend-link"
            onClick={() =>
              forgotPassword(email, Boolean(isFirstLogin === 'true'))
            }
          >
            {formatMessage(
              intl,
              'forgotPasswordSuccess.button.resendLink',
              'Resend Link',
            )}
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

ForgotPasswordSuccessContent.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  router: PropTypes.shape({}).isRequired,
  forgotPassword: PropTypes.func.isRequired,
  showBackBtn: PropTypes.bool,
};

ForgotPasswordSuccessContent.defaultProps = {
  showBackBtn: true,
};

export default compose(
  withRouter,
  injectIntl,
)(ForgotPasswordSuccessContent);
