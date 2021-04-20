import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const ChevronRight = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M6.73834 3.99965L14.736 12L6.73867 20L9 20L17 12L8.99967 3.99965L6.73834 3.99965Z"
      fill={colors.icon || colors.mediumEmphasis}
    />
  </SvgIcon>
);

ChevronRight.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

ChevronRight.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default ChevronRight;
