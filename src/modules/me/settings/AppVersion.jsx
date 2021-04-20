import React from 'react';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import { Typography } from '../../../uiComponents';
import CONFIG from '../../../constants/config';
import { formatMessage } from '../../../helpers/helpers';

const AppVersion = ({ intl }) => {
  const appVersion = formatMessage(
    intl,
    'me.tab.setting.label.appVersion',
    `Version ${CONFIG.appVersionName}`,
    {
      appVersion: CONFIG.appVersionName,
    },
  );
  const displayEnvironment =
    CONFIG.environment && CONFIG.environment.toUpperCase() !== 'PRODUCTION';

  return (
    <Box mt={4} mb={{ xs: 4, md: 0 }} textAlign={{ xs: 'center', md: 'right' }}>
      <Typography type="style-6">
        {displayEnvironment
          ? `${appVersion} [${CONFIG.environment.toUpperCase()}]`
          : appVersion}
      </Typography>
    </Box>
  );
};

AppVersion.propTypes = {
  intl: PropTypes.shape({}).isRequired,
};

export default injectIntl(AppVersion);
