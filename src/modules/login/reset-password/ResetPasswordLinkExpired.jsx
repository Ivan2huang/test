import React from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Box, Button } from '@material-ui/core';

import CONFIG from '../../../constants/config';
import { formatMessage } from '../../../helpers/helpers';
import Typography from '../../../uiComponents/Typography';

const contentAlignment = {
  cendol: 'center',
  basil: 'center',
  default: 'left',
};

const ResetPasswordLinkExpired = ({ intl, router, forgotPassword }) => {
  const { email, verify } = router.query;
  const align = contentAlignment[CONFIG.themeCode] || contentAlignment.default;
  return (
    <>
      <Box display="flex" textAlign={align} justifyContent={align}>
        <Typography type="style-1">
          {formatMessage(
            intl,
            'resetPasswordLinkExpired.Header.title',
            'Link expired',
          )}
        </Typography>
      </Box>
      <Box mt={4} display="flex" textAlign={align} justifyContent={align}>
        <Typography type="style-6">
          {formatMessage(
            intl,
            'resetPasswordLinkExpired.Header.description',
            'Click on "Resend Link" to request a new link',
          )}
        </Typography>
      </Box>
      <Box mt={4} display="flex" textAlign={align} justifyContent={align}>
        <Button
          variant="contained"
          color="primary"
          data-testid="btn-resend-link"
          onClick={() => forgotPassword(email, verify)}
        >
          {formatMessage(
            intl,
            'forgotPasswordSuccess.button.resendLink',
            'Resend link',
          )}
        </Button>
      </Box>
    </>
  );
};

ResetPasswordLinkExpired.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  router: PropTypes.shape({}).isRequired,
  forgotPassword: PropTypes.func.isRequired,
};

export default compose(injectIntl)(ResetPasswordLinkExpired);
