import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import PropTypes from 'prop-types';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const ChevronLeft = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M16.4 7.4L15 6L9 12L15 18L16.4 16.6L11.8 12L16.4 7.4Z"
      fill={colors.icon || colors.mediumEmphasis}
    />
  </SvgIcon>
);

ChevronLeft.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

ChevronLeft.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default ChevronLeft;
