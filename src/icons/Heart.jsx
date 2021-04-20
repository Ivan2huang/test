import React from 'react';
import * as PropTypes from 'prop-types';

import SvgIcon from '@material-ui/core/SvgIcon';
import { ICON_SIZE } from '../themes/theme';

const Heart = ({ width, height, color, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 18 18">
    <path
      d="M9 16.515L7.695 15.327C3.06 11.124 0 8.343 0 4.95C0 2.169 2.178 0 4.95 0C6.516 0 8.019 0.729 9 1.872C9.981 0.729 11.484 0 13.05 0C15.822 0 18 2.169 18 4.95C18 8.343 14.94 11.124 10.305 15.327L9 16.515Z"
      fill={color}
    />
  </SvgIcon>
);

Heart.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

Heart.defaultProps = {
  color: '#E9A115',
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Heart;
