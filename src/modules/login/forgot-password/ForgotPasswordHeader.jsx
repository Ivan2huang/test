import React from 'react';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import Typography from '../../../uiComponents/Typography';

const ForgotPasswordHeader = ({ intl }) => (
  <>
    <Box mb={4}>
      <Typography type="style-1">
        {intl.formatMessage({
          id: 'forgotPassword.Header.title',
          defaultMessage: 'Forgot your password?',
        })}
      </Typography>
    </Box>

    <Typography type="style-6">
      {intl.formatMessage({
        id: 'forgotPassword.Header.description',
        defaultMessage:
          'We will send you a link to reset your password. Provide your email address.',
      })}
    </Typography>
  </>
);

ForgotPasswordHeader.propTypes = {
  intl: PropTypes.shape({}).isRequired,
};

export default injectIntl(ForgotPasswordHeader);
