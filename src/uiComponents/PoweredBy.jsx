import React from 'react';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import Typography from './Typography';

import IMAGES from '../constants/images';

const PoweredBy = ({ intl }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={{
        xs: 'center',
        md: 'flex-end',
      }}
    >
      <Box mr={2}>
        <Typography type="style-8">
          {intl.formatMessage({
            id: 'footer.logoText',
            defaultMessage: 'Powered by',
          })}
        </Typography>
      </Box>
      <img src={IMAGES.POWERED_LOGO} alt="logo" />
    </Box>
  );
};

PoweredBy.propTypes = {
  intl: PropTypes.shape({}).isRequired,
};

export default injectIntl(PoweredBy);
