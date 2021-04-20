import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import Typography from '../../../uiComponents/Typography';
import { formatMessage } from '../../../helpers/helpers';

const MakeClaimHeader = ({ intl }) => (
  <Box
    mb={{
      xs: 8,
      sm: 15,
    }}
  >
    <Box>
      <Typography type="style-1">
        {formatMessage(intl, 'claim.makeClaim.header.title', 'Make a claim')}
      </Typography>
    </Box>
    <Box mt={3}>
      <Typography type="style-8">
        {formatMessage(
          intl,
          'claim.makeClaim.header.description',
          'Claim submission is only applicable to designated outpatient ' +
            'consultation incurred in HK (refer to ‘Consultation Type’ in the next step). ' +
            'Please keep your original receipt as HSBC Life BenefitsPlus reserves the right to request for ' +
            'the original receipt within 6 months of the claim completion date. ' +
            'For details, please refer to the leaflets.',
        )}
      </Typography>
    </Box>
  </Box>
);

MakeClaimHeader.propTypes = {
  intl: PropTypes.shape({}).isRequired,
};

export default injectIntl(MakeClaimHeader);
