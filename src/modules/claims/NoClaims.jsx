import React from 'react';
import { injectIntl } from 'react-intl';

import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

import Typography from '../../uiComponents/Typography';
import { formatMessage, navigateTo } from '../../helpers/helpers';
import paths from '../../helpers/paths';
import { CATEGORIES } from '../../constants/analytics';
import TrackingButton from '../../uiComponents/TrackingButton';

const NoClaims = ({ intl }) => {
  const navigateToMakeClaim = () => {
    navigateTo(paths.employee.makeClaim);
  };
  return (
    <Box mt={{ xs: 34 }} textAlign="center">
      <Box mt={{ sm: 8 }}>
        <Typography type="style-1">
          {formatMessage(intl, 'claims.noClaim.heading', 'No claims made')}
        </Typography>
      </Box>
      <Box mt={{ xs: 8 }}>
        <TrackingButton
          data-testid="btn-make-claim"
          variant="contained"
          color="primary"
          onClick={navigateToMakeClaim}
          trackingData={{
            category: CATEGORIES.CLAIMS_PAGE,
            action: 'Make a claim',
          }}
        >
          {formatMessage(intl, 'claims.button.label', 'Make a claim')}
        </TrackingButton>
      </Box>
    </Box>
  );
};

NoClaims.propTypes = {
  intl: PropTypes.shape({}).isRequired,
};

export default injectIntl(NoClaims);
