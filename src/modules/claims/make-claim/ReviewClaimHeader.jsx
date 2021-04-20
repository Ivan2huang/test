import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import Typography from '../../../uiComponents/Typography';
import { formatMessage } from '../../../helpers/helpers';

const ReviewClaimHeader = ({ intl }) => (
  <Box mb={{ xs: 8, sm: 15 }}>
    <Box>
      <Typography type="style-1">
        {formatMessage(intl, 'claims.claimReview.header.title', 'Review claim')}
      </Typography>
    </Box>
  </Box>
);

ReviewClaimHeader.propTypes = {
  intl: PropTypes.shape({}).isRequired,
};

export default injectIntl(ReviewClaimHeader);
