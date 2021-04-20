import React from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Box, Button } from '@material-ui/core';

import CONFIG from '../../constants/config';
import { formatMessage, navigateTo } from '../../helpers/helpers';
import Typography from '../../uiComponents/Typography';
import paths from '../../helpers/paths';

const contentAlignment = {
  cendol: 'center',
  basil: 'center',
  default: 'left',
};

const ResetPasswordLinkExpired = ({ intl }) => {
  const align = contentAlignment[CONFIG.themeCode] || contentAlignment.default;
  return (
    <>
      <Box display="flex" textAlign={align} justifyContent={align}>
        <Typography type="style-1">
          {formatMessage(
            intl,
            'tokenExpired.label.header',
            'Your login session has expired',
          )}
        </Typography>
      </Box>
      <Box mt={4} display="flex" textAlign={align} justifyContent={align}>
        <Typography type="style-6">
          {formatMessage(
            intl,
            'tokenExpired.label.description',
            'You have been logged out due to inactivity. Please login again.',
          )}
        </Typography>
      </Box>
      <Box mt={4} display="flex" textAlign={align} justifyContent={align}>
        <Button
          variant="contained"
          color="primary"
          data-testid="btn-back"
          onClick={() => navigateTo(paths.common.login)}
        >
          {formatMessage(intl, 'tokenExpired.btn.back', 'Back to login')}
        </Button>
      </Box>
    </>
  );
};

ResetPasswordLinkExpired.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  router: PropTypes.shape({}).isRequired,
};

export default compose(injectIntl)(ResetPasswordLinkExpired);
