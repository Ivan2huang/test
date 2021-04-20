import React from 'react';
import * as PropTypes from 'prop-types';

import SvgIcon from '@material-ui/core/SvgIcon';
import { ICON_SIZE } from '../themes/theme';

const Alcohol = ({ width, height, color, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 18 18">
    <path
      d="M4.5 4L2.5 2H15.5L13.5 4H4.5ZM8 10V16H3V18H15V16H10V10L18 2V0H0V2L8 10Z"
      fill={color}
    />
  </SvgIcon>
);

Alcohol.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

Alcohol.defaultProps = {
  color: '#E9A115',
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Alcohol;
