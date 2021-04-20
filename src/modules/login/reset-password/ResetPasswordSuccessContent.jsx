import React from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

import { Box, Button } from '@material-ui/core';

import CONFIG from '../../../constants/config';
import { formatMessage, navigateTo } from '../../../helpers/helpers';
import paths from '../../../helpers/paths';
import Typography from '../../../uiComponents/Typography';

const contentAlignment = {
  cendol: 'center',
  basil: 'center',
  default: 'left',
};

const ResetPasswordSuccessContent = ({ intl, showBackBtn }) => {
  const align = contentAlignment[CONFIG.themeCode] || contentAlignment.default;
  return (
    <>
      <Box display="flex" textAlign={align} justifyContent={align}>
        <Typography type="style-1">
          {formatMessage(
            intl,
            'resetPasswordSuccess.Header.title',
            'Password changed successfully',
          )}
        </Typography>
      </Box>
      <Box mt={4} display="flex" textAlign={align} justifyContent={align}>
        <Typography type="style-6">
          {formatMessage(
            intl,
            'resetPasswordSuccess.Header.description',
            'You can login to app with your new credentials',
          )}
        </Typography>
      </Box>
      {showBackBtn && (
        <Box mt={4} display="flex" justifyContent={align}>
          <Button
            variant="contained"
            color="primary"
            data-testid="btn-back-to-login"
            onClick={() => navigateTo(paths.common.logout)}
          >
            {formatMessage(
              intl,
              'forgotPasswordSuccess.button.backToLogin',
              'Back to log in',
            )}
          </Button>
        </Box>
      )}
    </>
  );
};

ResetPasswordSuccessContent.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  showBackBtn: PropTypes.bool,
};

ResetPasswordSuccessContent.defaultProps = {
  showBackBtn: true,
};

export default compose(injectIntl)(ResetPasswordSuccessContent);
