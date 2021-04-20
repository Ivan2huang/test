import React from 'react';
import * as PropTypes from 'prop-types';

import SvgIcon from '@material-ui/core/SvgIcon';
import { ICON_SIZE } from '../themes/theme';

const Sleep = ({ width, height, color, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 18 18">
    <path
      d="M14.7273 4.63636H8.18182V10.3636H1.63636V3H0V15.2727H1.63636V12.8182H16.3636V15.2727H18V7.90909C18 7.04111 17.6552 6.20868 17.0414 5.59492C16.4277 4.98117 15.5953 4.63636 14.7273 4.63636ZM4.90909 9.54545C5.56008 9.54545 6.1844 9.28685 6.64472 8.82654C7.10503 8.36622 7.36364 7.7419 7.36364 7.09091C7.36364 6.43992 7.10503 5.8156 6.64472 5.35528C6.1844 4.89497 5.56008 4.63636 4.90909 4.63636C4.2581 4.63636 3.63378 4.89497 3.17347 5.35528C2.71315 5.8156 2.45455 6.43992 2.45455 7.09091C2.45455 7.7419 2.71315 8.36622 3.17347 8.82654C3.63378 9.28685 4.2581 9.54545 4.90909 9.54545Z"
      fill={color}
    />
  </SvgIcon>
);

Sleep.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

Sleep.defaultProps = {
  color: '#E9A115',
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Sleep;
