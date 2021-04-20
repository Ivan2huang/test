import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';

import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const Refresh = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M11.6 4.8V0L5.6 6L11.6 12V7.2C13.5096 7.2 15.3409 7.95857 16.6912 9.30883C18.0414 10.6591 18.8 12.4904 18.8 14.4C18.8 16.3096 18.0414 18.1409 16.6912 19.4912C15.3409 20.8414 13.5096 21.6 11.6 21.6C9.69044 21.6 7.85909 20.8414 6.50883 19.4912C5.15857 18.1409 4.4 16.3096 4.4 14.4H2C2 16.9461 3.01143 19.3879 4.81178 21.1882C6.61212 22.9886 9.05392 24 11.6 24C14.1461 24 16.5879 22.9886 18.3882 21.1882C20.1886 19.3879 21.2 16.9461 21.2 14.4C21.2 11.8539 20.1886 9.41212 18.3882 7.61178C16.5879 5.81143 14.1461 4.8 11.6 4.8V4.8Z"
      fill={colors.activatedIcon || colors.primary}
    />
  </SvgIcon>
);

Refresh.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Refresh.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Refresh;
