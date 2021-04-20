import * as PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';

import { Box } from '@material-ui/core';

import { CLAIM_STATUS } from './constant';
import { AlertIcon } from '../../icons';
import { formatMessage } from '../../helpers/helpers';
import Typography from '../../uiComponents/Typography';

const MoreInformationRequired = ({ intl, status }) => {
  if (status !== CLAIM_STATUS.REQUEST_FOR_INFORMATION) return <></>;

  return (
    <Box display="flex" alignItems="center">
      <AlertIcon />
      <Box ml={1}>
        <Typography type="style-8">
          {formatMessage(
            intl,
            'claims.moreInformationRequired.label',
            'More information required',
          )}
        </Typography>
      </Box>
    </Box>
  );
};

MoreInformationRequired.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  status: PropTypes.string.isRequired,
};

export default injectIntl(MoreInformationRequired);
