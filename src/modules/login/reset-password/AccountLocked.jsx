import React from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Box } from '@material-ui/core';

import CONFIG from '../../../constants/config';
import { formatMessage } from '../../../helpers/helpers';
import Typography from '../../../uiComponents/Typography';

const contentAlignment = {
  cendol: 'center',
  basil: 'center',
  default: 'left',
};

const AccountLocked = ({ intl }) => {
  const align = contentAlignment[CONFIG.themeCode] || contentAlignment.default;

  const message = formatMessage(
    intl,
    'accountLocked.header.desc',
    `This account has been locked due to multiple failures during verification attempts. Please contact your customer service team via ${CONFIG.CSEmail} to unlock your account.`,
    {
      CSEmail: CONFIG.CSEmail,
    },
  );

  const title = formatMessage(
    intl,
    'accountLocked.header.title',
    'Contact Customer Support',
  );

  return (
    <>
      <Box display="flex" textAlign={align} justifyContent={align}>
        <Typography type="style-1">{title}</Typography>
      </Box>
      <Box mt={4} display="flex" textAlign={align} justifyContent={align}>
        <Typography type="style-6">{message}</Typography>
      </Box>
    </>
  );
};

AccountLocked.propTypes = {
  intl: PropTypes.shape({}).isRequired,
};

export default compose(injectIntl)(AccountLocked);
